const { Schema } = require("mongoose");

const Color = new Schema(
  {
      name: { type: String, required: true },
      value: { type: String, required: true },
  }
);


module.exports = Color;
