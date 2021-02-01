const express = require("express")
const { sequelize } = require("../models/index")
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const auth = require("../auth")
app.use(auth)



app.get("/", async (req, res) =>{
    let result = await transaksi.findAll({
        include: [
            "customer", 
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json(result)
})

app.get("/:customer_id", async (req, res) =>{
    let param = { customer_id: req.params.customer_id}
    let result = await transaksi.findAll({
        where: param,
        include: [
            "customer", 
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json(result)
})

app.post("/", async (req, res) =>{
    let current = new Date().toISOString().split('T')[0]
    let data = {
        customer_id: req.body.customer_id,
        waktu: current,
    }
    transaksi.create(data)
    .then(result => {
        let lastID = result.transaksi_id
        detail = req.body.detail_transaksi
        detail.forEach(element => {
            element.transaksi_id = lastID
        });
        console.log(detail);
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

app.put("/", async (req, res) =>{
    
})

app.delete("/:transaksi_id", async (req, res) =>{
    let param = { transaksi_id: req.params.transaksi_id}
    // detail_transaksi.destroy({where: param})
    // .then(result => {
    //     transaksi.destroy({where : param})
    //     .then()
    //     .catch()
    // })
    // .catch(error => {
    //     console.log(error.message);
    // })
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

module.exports = app