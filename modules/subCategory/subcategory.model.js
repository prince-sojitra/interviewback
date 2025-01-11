const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategoryData = new Schema({
    subCategoryname: {
        type: String,
        unique: true,
        required : [true,'please enter a subcategory name']
    },
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
        required : [true,'please enter a category id']
    },
    status: {
        type: String,
        enum : ["on","off"],
        default : "on"
    },
    
});

let SUBCATEGORY = mongoose.model('subCategory',subcategoryData)
module.exports = SUBCATEGORY