const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const customer = require("./router/customer")
const product = require("./router/product")
const transaksi = require("./router/transaksi")
const admin = require("./router/admin")
app.use("/store/api/v1/customer", customer)
app.use("/store/api/v1/product", product)
app.use("/store/api/v1/transaksi", transaksi)
app.use("/store/api/v1/admin", admin)

app.use(express.static(__dirname))


app.listen(8000, () => {
    console.log("Server run on port 8000");
})