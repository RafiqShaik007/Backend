const mongoose = require("mongoose");

const db_connect = () => {
  let url = "mongodb://localhost:27017/CRUD";
  mongoose.connect(url)
    .then(function () {
      console.log("Your MongoDB database is connected successfully");
    })
    .catch(function () {
      console.log("Got some Error while conneting with MongoDB");
    });
};

module.exports = db_connect
