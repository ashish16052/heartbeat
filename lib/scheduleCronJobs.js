const cron = require('node-cron')
const axios = require("axios");
const WebsiteModel = require('../model/Website');
const { response } = require('express');

function scheduleCronJobs(websiteArray) {
    const oldJobs = cron.getTasks()
    for (const [key, task] of oldJobs) {
        task.stop();
    }
    websiteArray.forEach((website) => {
        cron.schedule(`0 */${website.interval} * * * *`, function () {
            axios.get(website.url)
                .then(async response => {
                    console.log(`[${new Date()}] Pinged website ${website.url} Response status: ${response.status}`)
                    await WebsiteModel.findByIdAndUpdate(website._id, { status: response.status })
                })
                .catch(async error => {
                    console.error(`[${new Date()}] Failed to ping website ${website.url} Error: ${error.message}`)
                    await WebsiteModel.findByIdAndUpdate(website._id, { status: 504 })
                })
        });
    })
}

module.exports = scheduleCronJobs