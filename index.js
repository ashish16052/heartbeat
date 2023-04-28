const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
var WebsiteModel = require('./model/Website');
const scheduleCronJobs = require('./controller/scheduleCronJobs')
require('dotenv').config();
app = express();

var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);

const hostarr = [
    {
        url: 'https://www.youtube.com/',
        interval: 1,
    },
    {
        url: 'https://twitter.com/',
        interval: 1,
    }
]


mongoose.connect(process.env.DB);
mongoose.connection.on("connected", () => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port: " + process.env.PORT);
    });
    console.log("Connected to production database");
    scheduleCronJobs(hostarr)
}).on("error", (err) => {
    console.log("Error in database connection" + err);
});