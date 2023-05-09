const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
      maxLength: 40,
    },
    userName: {
      type: "string",
      require: true,
    },
    userEmail: {
      type: "string",
      require: true,
    },
    userNumber: {
      type: "string",
      require: true,
    },

    model: {
      type: "string",
      require: true,
    },

    price: {
      type: "string",
      require: true,
    },

    region: {
      type: "string",
      require: true,
    },
    datef: {
      type: "string",
      require: true,
    },

    datet: {
      type: "string",
      require: true,
    },
    image: {
      type: "string",
      require: true,
    },

    description: {
      type: "string",
      require: true,
      maxLength: "1000",
    },
    salt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("add", ProductSchema);
