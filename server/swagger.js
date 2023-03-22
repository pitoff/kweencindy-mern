const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Basic meta info about Kweencindy API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Kweencindy Booking App API", version: "1.0.0" }
    },
    apis: [
        "./v1/routes/authRoutes.js",
        "./v1/routes/userRoutes.js",
        "./v1/routes/bookingRoutes.js",
        "./v1/routes/categoryRoutes.js"
    ]
};

//Docs in json format
const swaggerSpec = swaggerJSDoc(options);

//function to set up docs
const swaggerDocs = (app, port) => {
    //Route Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //Make docs in json format
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec)
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    )
}

module.exports = { swaggerDocs }