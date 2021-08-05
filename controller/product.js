const productModel = require('../models/Product.js');

exports.createProduct = async (req, res, next)=>{
    try { 
        const createdProduct = await productModel.create(req.body);
        res.status(201).json( createdProduct );
    } catch (error) {
        // next(error)
        res.status(500).json(error.message);
    }

}

exports.getProducts = async (req, res, next) => {
    try {
        const allProducts = await productModel.find({});
        res.json(allProducts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}