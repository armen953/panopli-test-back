const mongoose = require("mongoose");
const Color = require("./Color");

const Address = new mongoose.Schema(
  {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      username: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true },
  }
);


const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String, required: true},
        title: { type: String, required: true },
        slug: { type: String, required: true },
        size: { type: String, required: true },
        desc: { type: String, required: true },
        images: { type: Array, required: true },
        color: { type: Color, required: true },
        price: { type: Number, required: true },
        selectedQuantity: { type: Number, required: true, default: 1 }
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Address }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

