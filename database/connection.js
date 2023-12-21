const mongoose = require("mongoose");
const keys = require("../config/keys");

const connect = async () => {
  try {
    console.log("Connecting to db");
    const connectionStr = keys.mongodb.dbURI;
    console.log(connectionStr);
    if (!connectionStr) {
      console.log("Connection string is not defined!!!");
      return;
    }
    await mongoose.connect(connectionStr);
    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.log("Could not connect", err);
  }
};

module.exports = connect;
