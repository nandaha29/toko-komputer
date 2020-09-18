const express = require("express")
const app = express()
const customer = require("./router/customer")
const product = require("./router/product")
const transaksi = require("./router/transaksi")
const admin = require("./router/admin")
app.use("/shop/api/v1/customer", customer)
app.use("/shop/api/v1/product", product)
app.use("/shop/api/v1/transaksi", transaksi)
app.use("/shop/api/v1/admin", admin)

app.listen(8000, () => {
    console.log("Server run on port 8000");
})