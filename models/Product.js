const { Schema, model } = require("mongoose");
const { slugify } = require("../utils/utils");
const Color = require("./Color");

const ProductSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: {
            type: String,
            required: true,
            unique: true,
            default: function () {
                return slugify(this.title)
            }
        },
        sizes: { type: Array, required: true },
        desc: { type: String, required: true },
        images: { type: Array, required: true },
        colors: [Color],
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

module.exports = model("Product", ProductSchema);
