const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const WebsiteModel = require('./model/Website');
const authenticateAdmin = require('./lib/authenticateAdmin');
const scheduleCronJobs = require('./lib/scheduleCronJobs')
require('dotenv').config();
app = express();

app.set('view engine', 'ejs')

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

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', authenticateAdmin, (req, res) => {
    res.redirect('/')
})

app.post('/', async (req, res) => {
    const { name, url, interval } = req.body
    await WebsiteModel.create({ name, url, interval })
    const websiteData = await WebsiteModel.find()
    scheduleCronJobs(websiteData)
    res.redirect('/')
})

app.post('/edit', async (req, res) => {
    await WebsiteModel.findByIdAndUpdate(req.body._id, req.body, { upsert: true, new: true })
    const websiteData = await WebsiteModel.find()
    scheduleCronJobs(websiteData)
    res.redirect('/')
})

app.post('/delete', async (req, res) => {
    await WebsiteModel.deleteOne({ _id: req.body._id })
    res.redirect('/')
})

app.get('/', async (req, res) => {
    if (app.get('user')) {
        res.render('index', { websiteData });
    }
    else
        res.redirect('/login')
})

mongoose.connect(process.env.DB);
mongoose.connection.on("connected", async () => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port: " + process.env.PORT);
    });
    console.log("Connected to production database");
}).on("error", (err) => {
    console.log("Error in database connection" + err);
});