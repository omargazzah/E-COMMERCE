const express = require("express");
const { add, getallproducts, getById } = require("../controllers/Product");
const { check } = require("express-validator");
const router = express.Router();
const { authenticateToken } = require("../auth");
router.post(
  "/addProduct",
  [
    check("name", "Name atleast should be 3 characters").isLength({ min: 3 }),
    check("description", "Description atleast should be 3 characters").isLength(
      { min: 3 }
    ),
  ],
  authenticateToken,
  add
);
router.get("/getallproducts", getallproducts);
router.get("/product/:id", getById);
module.exports = router;
