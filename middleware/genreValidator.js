const { body, validationResult } = require("express-validator");
const validate = {};

// Validation rules for Genres
validate.genreRules = () => {
  return [
    // name is required
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Genre name is required.')
      .isString()
      .withMessage('Genre name must be a string.'),

    // description is required
    body('description')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Description is required.')
      .isString()
      .withMessage('Description must be a string.'),

    // popularMovies is required and must be an array
    body('popularMovies')
      .notEmpty()
      .withMessage('Popular movies field is required.')
      .isArray()
      .withMessage('Popular movies must be an array of movie titles.'),

    // originDecade is required
    body('originDecade')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Origin decade is required.')
      .isString()
      .withMessage('Origin decade must be a string.')
  ];
};

// Middleware to check validation results
validate.checkGenreData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: errors.array(),
    });
  }
  next();
};

module.exports = validate;
