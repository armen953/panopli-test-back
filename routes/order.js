const OrderController = require("../controller/OrderController");

const router = require("express").Router();

router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrder);

module.exports = router;