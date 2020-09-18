const express = require("express")
const app = express()
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const admin = models.admin

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.get("/", auth, async(req, res) => {
    let result = await admin.findAll()
    res.json({
        data: result
    })
})

app.post("/", async(req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }

    admin.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async(req, res) => {
    let param = { admin_id: req.body.admin_id}
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }

    admin.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:admin_id", async(req, res) => {
    let param = {admin_id: req.params.admin_id}
    admin.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: params})
    let payload = JSON.stringify(result)
    // generate token
    let token = jwt.sign(payload, SECRET_KEY)
    res.json({
        data: result,
        token: token
    })
})

module.exports = app