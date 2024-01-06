const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

mongoose.connect(
  "mongodb+srv://Kunal0NQ:pass123@cluster0.usqbx8r.mongodb.net/instagram?retryWrites=true&w=majority"
);

const UserSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password:String
});

UserSchema.plugin(plm)

module.exports = mongoose.model("user", UserSchema)