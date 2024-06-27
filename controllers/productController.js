const Product = require('../models/product');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100 });

exports.getProducts = async (req, res, next) => {
    try {
        const cachedProducts = cache.get('products');
        if (cachedProducts)
            return res.json(cachedProducts);

        const products = await Product.find();
        cache.set('products', products);
        return res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    const { name, description, price, stock } = req.body;

    try {
        const newProduct = new Product({ name, description, price, stock });
        const product = await newProduct.save();
        cache.del('products'); // Invalidate cache
        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};
