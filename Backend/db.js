const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME
}).then(
    () => { 
        console.log("Connected To Database");
    }
).catch((err) => {
    console.log("Error in connecting in the database" + err);
})