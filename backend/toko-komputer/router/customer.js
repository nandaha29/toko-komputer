const express = require("express")
const models = require("../models/index")
const customer = models.customer
const app = express()
app.use(express.json())

const multer = require("multer")
const path = require("path")
const fs = require("fs")
const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"
// app.use(auth)




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


app.get("/", auth, (req, res) =>{
    customer.findAll()
            .then(customers => {
                res.json(customers)
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    
})

app.get("/:customer_id", auth, (req, res) =>{
    customer.findOne({ where: {customer_id: req.params.customer_id}})
    .then(customer => {
        res.json(customer)
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
            image: req.file.filename,
            username: req.body.username,
            password: md5(req.body.password)
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
        username: req.body.username
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

    if(req.body.password){
        data.password = md5(req.body.password)
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

app.delete("/:customer_id", auth, async (req, res) =>{
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

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await customer.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app