const User = require("../models/user");
const { validationResult } = require("express-validator");
const user = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { generateAccessToken } = require("../auth.js");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to add user",
      });
    }

    return res.json({
      message: "Success",
      data: user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found",
      });
    }

    // Authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    // Create token
    const token = generateAccessToken(
      user._id,
      user.name,
      user.email,
      user.number,
      user.role
    );

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 2 });

    // Send response
    const { _id, name, email, number, role } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        number,
        role,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "User siginout successful",
  });
};

exports.updateUser = async (req, res) => {
  const { email, name, number } = req.body;
  const filter = { _id: req.params.userId };

  const update = {
    email: email,
    name: name,
    number: number,
  };

  const oldDocument = await User.updateOne(filter, update);
  return res.json({
    message: oldDocument,
  });
};

exports.getallusers = (req, res) => {
  user
    .find()
    .then((users) => {
      // res.render("listProducts");
      return res.json({
        //  message: "List Products",
        data: users,
      });
    })
    .catch((err) => console.log(err));
};
