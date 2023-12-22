const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String, //displayName
  googleId: String,
  photoUrl: String,
});
//By keeping googleId in the database we can identify if the user visited us before (by looking up his id in db)

const User = mongoose.model("user", userSchema);

module.exports = User;
