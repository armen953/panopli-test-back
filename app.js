const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors");

const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

const app = express()
dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(()  => {
        console.log('db connection successfull');
    })
    .catch((err) => {
        console.log(err);
    })

app.use(cors());
app.use(express.json())

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Backend server is running on port ' + server.address().port);
})