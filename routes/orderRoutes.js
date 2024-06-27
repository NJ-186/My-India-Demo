const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../utils/validate');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', authMiddleware, [
    check('products').isArray().withMessage('Products must be an array'),
    check('products.*.product').isMongoId().withMessage('Invalid product ID'),
    check('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], validateRequest, createOrder);

module.exports = router;
