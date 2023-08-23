
const mongoose = require('mongoose');

mongoose.connect(process.env.PROD_URL).
    then(() => {
        console.log("Database connection established")
    }).catch((err) => {
        console.log(err)
    })