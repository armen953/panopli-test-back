const { request, response } = require('express');
const Product = require('../models/Product');

/**
 * Get all the products
 * @param {request} req 
 * @param {response} res 
 */
exports.getProducts = async (req, res) => {
    const newProductLimit = req.query.newProductLimit

    try {
        let products;
        if (newProductLimit) {
            products = await Product.find().sort({ createdAt: -1 }).limit(newProductLimit);
        } else {
            products = await Product.find().sort({ createdAt: -1 });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "Erreur lors de la création du produit" });
    }
}

/**
 * Get a single product
 * @param {request} req 
 * @param {response} res 
 */
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ "error": "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "Erreur lors de la recherche du produit" });
    }
}

/**
 * Get a single product
 * @param {request} req 
 * @param {response} res 
 */
exports.createProduct = async (req, res) => {
    console.log(req.body);
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json("Erreur lors de la création du produit");
    }
}