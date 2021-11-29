const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test').then(() =>
    console.log("Connection")
).catch((err) => {
    console.log(`err`, err)
})