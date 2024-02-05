function connectDB() {
    const mongoose = require("mongoose");
    const URL = process.env.DATABASE_URL;
    mongoose
        .connect(URL)
        .then((doc) => {
            console.log("connection success");
        })
        .catch((err) => {
            console.log(err);
        });
}
module.exports = connectDB;
