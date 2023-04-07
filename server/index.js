const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()

const v1AuthRoute = require('./v1/routes/authRoutes')
const v1UserRoute = require('./v1/routes/userRoutes')
const v1BookingRoute = require('./v1/routes/bookingRoutes')
const v1CategoryRoute = require('./v1/routes/categoryRoutes')
const v1PaymentMethod = require('./v1/routes/paymentMethodRoutes')

const { swaggerDocs: v1SwaggerDocs } = require('./swagger')

const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cookieParser())
//to avoid invalid cors errors
app.use(cors(corsOptions))
//accepts requests as json
app.use(express.json({extended:true}))
//express accept requests as strings and array
app.use(express.urlencoded({extended:true}))

//routes
app.use("/api/v1/", v1AuthRoute)
app.use("/api/v1/bookings", v1BookingRoute)
app.use("/api/v1/users", v1UserRoute)
app.use("/api/v1/category", v1CategoryRoute)
app.use("/api/v1/payment-method", v1PaymentMethod)

const PORT = process.env.PORT || 5000;

const mongoDb = process.env.DB_CONNECTION
mongoose.connect(mongoDb, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    http.listen(PORT, () => {
        console.log(`API listening on port ${PORT}`);
        v1SwaggerDocs(app, PORT)
    })
}).catch((error) => console.log(error))