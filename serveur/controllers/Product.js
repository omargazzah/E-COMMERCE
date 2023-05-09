const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const User = require("../models/user");
const Add = require("../models/Product");
const { parseJwt } = require("../token");

exports.add = async (req, res) => {
  const errors = validationResult(req);

  const productToAdd = req.body;
  const user = req.user;
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  productToAdd.userName = user.name;
  productToAdd.userEmail = user.email;
  productToAdd.userNumber = user.number;
  console.log("userEmail: ", productToAdd.userEmail);
  console.log("user email ", user.email);
  const add = new Add(productToAdd);
  add.save((err, add) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to add Product",
      });
    }

    return res.json({
      message: "Product Added",
      data: add,
    });
  });
};

exports.getallproducts = (req, res) => {
  Product.find()
    .then((products) => {
      // res.render("listProducts");
      return res.json({
        //  message: "List Products",
        data: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      return res.json({
        data: product,
      });
    })
    .catch((err) => console.log(err));
};
