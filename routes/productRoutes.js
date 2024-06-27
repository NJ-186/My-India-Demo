const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const {authMiddleware, authAdminMiddleware} = require('../middlewares/authMiddleware');
const { validateRequest } = require('../utils/validate');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', getProducts);

router.post('/', authMiddleware, authAdminMiddleware, [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    check('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], validateRequest, createProduct);

module.exports = router;
