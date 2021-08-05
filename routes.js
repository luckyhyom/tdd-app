const express = require('express');
const productController = require('./controller/product.js')
const router = express.Router();

router.post('/', productController.createProduct);

module.exports = router;