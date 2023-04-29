const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const websiteSchema = new Schema({
    _id: {
        type: String,
        require: true,
        default: uuidv4,
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
        required: true,
    }
});

websiteSchema.pre('save', function(next) {
    if (this.interval < 10) {
      this.interval = 10;
    }
    next();
  });

module.exports = mongoose.model("Website", websiteSchema);