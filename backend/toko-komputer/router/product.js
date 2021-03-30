const express = require("express")
const models = require("../models/index")
const product = models.product
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
app.use(auth)


// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./product_image")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})


app.get("/", (req, res) =>{
    product.findAll()
    .then(product => {
        res.json(product)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:product_id", (req, res) =>{
    product.findOne({ where: {product_id: req.params.product_id}})
    .then(product => {
        res.json(product)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("image"), (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: req.file.filename
        }
        product.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

        
    }
})

app.put("/", upload.single("image"), async (req, res) =>{
    let param = { product_id: req.body.product_id}
    let data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
    }
    if (req.file) {
        // get data by id
        const row = await product.findOne({where: param})
        let oldFileName = row.image
            
        // delete old file
        let dir = path.join(__dirname,"../product_image",oldFileName)
        fs.unlink(dir, err => console.log(err))
        

        // set new filename
        data.image = req.file.filename
    }

    product.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:product_id", async (req, res) =>{
    try {
        let param = { product_id: req.params.product_id}
        let result = await product.findOne({where: param})
        let oldFileName = result.image
            
        // delete old file
        let dir = path.join(__dirname,"../product_image",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        product.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app