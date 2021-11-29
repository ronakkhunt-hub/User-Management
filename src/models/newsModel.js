const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const newsModel = mongoose.model('news', newsSchema)
module.exports = newsModel