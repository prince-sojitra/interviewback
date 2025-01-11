const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminData = new Schema({
  firstname: {
    type: String,
    required: [true, "please enter a firstname"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "please enter a lastname"],
    trim: true,
  },
  contact: {
    type: String,
    required: [true, "please enter a lastname"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter a email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    trim: true,
  },
});

let ADMIN = mongoose.model("admin", AdminData);
module.exports = ADMIN;
