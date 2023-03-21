const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

const v1BookingRoute = require('./v1/routes/bookingRoutes')
const v1AuthRoute = require('./v1/routes/authRoutes')

const { swaggerDocs: v1SwaggerDocs } = require('./swagger')

const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials: true,
    optionSuccessStatus: 200
}

//to avoid invalid cors errors
app.use(cors(corsOptions))
//accepts requests as json
app.use(express.json({extended:true}))
//express accept requests as strings and array
app.use(express.urlencoded({extended:true}))

//routes
app.use("/api/v1/", v1AuthRoute)
app.use("/api/v1/bookings", v1BookingRoute)

const PORT = process.env.PORT || 5000;

const mongoDb = process.env.DB_CONNECTION
mongoose.connect(mongoDb, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    http.listen(PORT, () => {
        console.log(`API listening on port ${PORT}`);
        v1SwaggerDocs(app, PORT)
    })
}).catch((error) => console.log(error))

