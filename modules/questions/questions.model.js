const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsData = new Schema({
  questions: {
    type: String,
    unique: true,
    required: [true,'please enter questions'],
  },
  answer: {
    type: String,
    required: [true,"please enter answer"],
  },
  subcategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    required: [true, "please enter subcategory id"],
  }
});

let QUESTIONS = mongoose.model("questions", questionsData);
module.exports = QUESTIONS;
