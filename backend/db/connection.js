const mongoose = require("mongoose");

function connectionToDB() {
  console.log("connection ");
  mongoose.connect("mongodb://127.0.0.1:27017/task-management-2");
}

module.exports = connectionToDB;
