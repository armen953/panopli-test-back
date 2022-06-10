const ProductController = require("../controller/ProductController");

const router = require("express").Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);
router.get("/:slug", ProductController.getProduct);

module.exports = router;
