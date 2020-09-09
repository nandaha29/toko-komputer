const express = require("express")
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const app = express()
app.use(express.urlencoded({ extended: true}))



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
    res.json({
        data: result
    })
})

app.get("/:transaksi_id", async (req, res) =>{
    let param = { transaksi_id: req.params.transaksi_id}
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
    res.json({
        data: result
    })
})

app.post("/", async (req, res) =>{
    let data = {
        customer_id: req.body.customer_id,
        waktu: req.body.waktu,
    }
    transaksi.create(data)
    .then(result => {
        let lastID = result.transaksi_id
        detail = JSON.parse(req.body.detail_transaksi)
        detail.forEach(element => {
            element.transaksi_id = lastID
        });
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