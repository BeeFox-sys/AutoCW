const mongoose = require('mongoose');
const config = require('../config.json')

module.exports = {
    guild: new mongoose.Schema({
        _id:String,
        prefix: {type:String, default: config.prefix},
        disallowed: [[String,String]]
    }),
    channel: new mongoose.Schema({
        _id:String,
        disableGlobal: Boolean,
        disallowed: [[String,String]],
        exceptions: [String]
    })
}