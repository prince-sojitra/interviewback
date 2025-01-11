var SUBCATEGORY = require("./subcategory.model");
var QUESTIONS = require("../questions/questions.model");
exports.subcatagoryCreate = async function (req, res, next) {
  try {
    // req.body.subCategoryImage = req.files.map(el => el.filename)
    let categoryData = await SUBCATEGORY.create(req.body);
    res.status(201).json({
      status: "success",
      message: "sub-category Create success",
      data: categoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.subcatagoryFind = async function (req, res, next) {
  try {
    if (req.query.search) {
      let catagoryDataSearch = await SUBCATEGORY.find({
        subCategoryname: { $regex: req.query.search, $options: "i" },
      }).populate("categoryID");
      res.status(200).json({
        status: "success",
        message: "sub-category Search success",
        data: catagoryDataSearch,
      });
    } else {
      let categoryData = await SUBCATEGORY.find().populate("categoryID");
      res.status(200).json({
        status: "success",
        message: "sub-category Found success",
        data: categoryData,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.subcatagoryCount = async function (req, res, next) {
  try {
    let categoryData = await SUBCATEGORY.find().count();
    res.status(200).json({
      status: "success",
      message: "sub-category Count success",
      data: categoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.subcatagoryDelete = async function (req, res, next) {
  try {
    let findcatagory = await SUBCATEGORY.findById(req.params.id);
    if (!findcatagory) {
      throw new Error("sub-category is Already Delete");
    }
    await SUBCATEGORY.findByIdAndDelete(req.params.id);

    await QUESTIONS.deleteMany({ subcatagoryID: req.params.id });

    res.status(200).json({
      status: "success",
      message: "sub-category Delete success",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.subcatagoryUpdate = async function (req, res, next) {
  try {
    // req.body.subCategoryImage = req.files.map(el => el.filename)
    let CategoryData = await SUBCATEGORY.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "sub-category Update success",
      data: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
