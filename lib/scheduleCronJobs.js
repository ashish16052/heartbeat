const cron = require('node-cron')
const axios = require("axios");

function scheduleCronJobs(websiteArray) {
    const oldJobs = cron.getTasks()
    for (const [key, task] of oldJobs) {
        task.stop();
    }
    websiteArray.forEach((website) => {
        cron.schedule(`0 */${website.interval} * * * *`, function () {
            axios.get(website.url)
                .then(response => {
                    console.log(`[${new Date()}] Pinged website ${website.url} Response status: ${response.status}`)
                })
                .catch(error => {
                    console.error(`[${new Date()}] Failed to ping website ${website.url} Error: ${error.message}`)
                })
        });
    })
}

module.exports = scheduleCronJobs