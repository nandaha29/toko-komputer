const express = require("express")
const models = require("../models/index")
const customer = models.customer
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
app.use(auth)

// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./image")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})


app.get("/", (req, res) =>{
    customer.findAll()
    .then(customers => {
        res.json({
            data: customers
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:customer_id", (req, res) =>{
    customer.findOne({ where: {customer_id: req.params.customer_id}})
    .then(customer => {
        res.json({
            data: customer
        })
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
            phone: req.body.phone,
            address: req.body.address,
            image: req.file.filename
        }
        customer.create(data)
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

app.put("/", upload.single("image"), (req, res) =>{
    let param = { customer_id: req.body.customer_id}
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
    }
    if (req.file) {
        // get data by id
        const row = customer.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
            
            // delete old file
            let dir = path.join(__dirname,"../image",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })
        

        // set new filename
        data.image = req.file.filename
    }

    customer.update(data, {where: param})
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

app.delete("/:customer_id", async (req, res) =>{
    try {
        let param = { customer_id: req.params.customer_id}
        let result = await customer.findOne({where: param})
        let oldFileName = result.image
            
        // delete old file
        let dir = path.join(__dirname,"../image",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        customer.destroy({where: param})
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