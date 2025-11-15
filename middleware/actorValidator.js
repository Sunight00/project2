const { body, validationResult } = require("express-validator");
const validate = {};

validate.actorRules = () => {
  return [
    // fullName is required
    body('fullName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Full name is required.')
      .isString()
      .withMessage('Fullname must be a string.'),

    // gender is required
    body('gender')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Gender is required.')
      .isString()
      .withMessage('Gender must be a string.'),

    // age is required and must be a number
    body('age')
      .notEmpty()
      .withMessage('Age is required.')
      .isInt({ min: 1 })
      .withMessage('Age must be a valid number.'),

    // nationality is required
    body('nationality')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Nationality is required.'),

    // knownFor is required (can be a string or array)
    body('knownFor')
      .notEmpty()
      .withMessage('KnownFor field is required.'),

    // yearsActive is required
    body('yearsActive')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Years active is required.'),

    // awardsCount is required and must be a number
    body('awardsCount')
      .notEmpty()
      .withMessage('Awards count is required.')
      .isInt({ min: 0 })
      .withMessage('Awards count must be a number.')
  ];
};


validate.checkActorData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({
            success: false,
            message: 'Validation failed',
            data: errors.array(),
        });
    }
    next();
};



module.exports = validate;
