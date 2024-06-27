const Order = require('../models/order');
const Product = require('../models/product');

exports.createOrder = async (req, res, next) => {
    const { products } = req.body;

    try {
        const user = req.user;
        let total = 0;

        // Calculate total price and check stock
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product)
                return res.status(404).json({ message: `Product ${item.product} not found` });
            if (product.stock < item.quantity)
                return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });

            total += product.price * item.quantity;
        }

        const order = new Order({ user: user._id, products, total });
        await order.save();

        return res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};
