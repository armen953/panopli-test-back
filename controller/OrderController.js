const { request, response } = require('express');
const { blackListCards } = require('../fakeData/CreditCard');
const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * Create an order
 * @param {request} req 
 * @param {response} res 
 */
exports.createOrder = async (req, res) => {
  const { products, addressInfo, paymentData } = req.body

  if (blackListCards.includes(paymentData.number)) {
    return res.status(400).json({ "error": "La carte bancaire n'est pas valide" });
  }

  let tmpAmount = 0;
  const orderProducts = [];
  products.forEach(product => {
    orderProducts.push({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      size: product.size,
      desc: product.desc,
      images: product.images,
      color: product.color,
      price: product.price,
      selectedQuantity: product.selectedQuantity
    })
    tmpAmount += product.price * product.selectedQuantity;
  });
  const newOrder = new Order({
    products: orderProducts,
    amount: tmpAmount,
    address: addressInfo
  });

  try {
    const savedOrder = await newOrder.save();
    newOrder.products.forEach(async product => {
      const prod = await Product.findById(product.productId);
      prod.quantity = prod.quantity - product.selectedQuantity
      await prod.save()
    });
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "error": "Erreur lors de la création du produit" });
  }
}

/**
 * Get an order
 * @param {request} req 
 * @param {response} res 
 */
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ "error": "Commande non trouvé" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "error": "Erreur lors de la recherche de la commande" });
  }
}