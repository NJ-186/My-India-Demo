const { check, validationResult } = require('express-validator');

exports.validateUserRegistration = [
    check('email').isEmail().withMessage('Invalid email.'),
    check('password').isLength({ min: 8 })
                     .withMessage('Password must be at least 8 characters long')
                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                     .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'),
    check('name').isString()
                 .withMessage('Name must be a string')
                 .isLength({ min: 2, max: 50 })
                 .withMessage('Name must be between 2 and 50 characters long')
                 .matches(/^[A-Za-z\s]+$/)
                 .withMessage('Name can only contain letters and spaces')
];

exports.validateUserLogin = [
    check('email').isEmail().withMessage('Invalid email format')
];

exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
