var CATEGORY = require("./category.model");
var SUBCATEGORY = require("../subCategory/subcategory.model");
var QUESTIONS = require("../questions/questions.model");

exports.categoryCreate = async function (req, res, next) {
  try {
    req.body.adminId = req.adminId;
    let catagoryData = await CATEGORY.create(req.body);
    res.status(201).json({
      status: "success",
      message: "category Create success",
      data: catagoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.categoryFind = async function (req, res, next) {
  try {
    if (req.query.search) {
      let categoryDataSearch = await CATEGORY.find({
        categoryName: { $regex: req.query.search, $options: "i" },
      });
      res.status(200).json({
        status: "success",
        message: "category Search success",
        data: categoryDataSearch,
      });
    } else {
      let categoryData = await CATEGORY.find();

      res.status(200).json({
        status: "success",
        message: "category Found success",
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

exports.categoryCount = async function (req, res, next) {
  try {
    let catagoryData = await CATEGORY.find().countDocuments();

    res.status(200).json({
      status: "success",
      message: "category Count success",
      data: catagoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.categoryDelete = async function (req, res, next) {
  try {
    let findcategory = await CATEGORY.findById(req.params.id);

    if (!findcategory) {
      throw new Error("Category is Already Delete");
    }

    // QUESTIONS DELETE

    let SUB_CATEGORIES_DATA = await SUBCATEGORY.find({
      categoryID: req.params.id,
    });

    let SUB_CATEGORIES_ID = await SUB_CATEGORIES_DATA.map(
      (SUB_CATE) => SUB_CATE._id
    );

    await QUESTIONS.deleteMany({ subcategoryID: { $in: SUB_CATEGORIES_ID } });

    // SUBCATEGORY DELETE

    // CATEGORY DELETE
    await SUBCATEGORY.deleteMany({ categoryID: req.params.id });

    await CATEGORY.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "category Delete success",
    }); 
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.categoryUpdate = async function (req, res, next) {
  try {
    // req.body.categoryImage = req.files.map(el => el.filename)
    let CategoryData = await CATEGORY.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "category Update success",
      data: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
