const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const websiteSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    interval: {
        type: Number,
        default: 15,
        required: true,
    }
});

module.exports = mongoose.model("Website", websiteSchema);