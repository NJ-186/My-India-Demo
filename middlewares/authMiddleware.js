const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user)
            return res.status(404).json({ error: 'User not found.' });

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

const authAdminMiddleware = (req, res, next) => {
    if (!req.user.role != "admin")
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    next();
};

module.exports = { authMiddleware, authAdminMiddleware };
