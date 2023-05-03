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
                    regex = /status code (\d+)/;
                    try {
                        const status = error.message.match(regex)[1];
                        await WebsiteModel.findByIdAndUpdate(website._id, { status: status })
                    } catch (err) {
                        const status = 504
                        await WebsiteModel.findByIdAndUpdate(website._id, { status: status })
                    }
                })
        });
    })
}

module.exports = scheduleCronJobs