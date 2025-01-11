const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catagoryData = new Schema({
  categoryName: {
    type: String,
    unique: true,
    required: [true,"please enter category name"],
  },
  status: {
    type: String,
    enum: ["on", "off"],
    default: "on",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
});
let CATAGORY = mongoose.model("category", catagoryData);
module.exports = CATAGORY;
