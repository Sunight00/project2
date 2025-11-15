const { body, validationResult } = require("express-validator");
const validate = {};

validate.movieRules = () => {
  return [
    // title is required
    body('title')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Movie title is required.'),

    // genre is required
    body('genre')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Genre is required.'),

    // releaseYear is required and must be a number
    body('releaseYear')
      .notEmpty()
      .withMessage('Release year is required.')
      .isInt({ min: 1888 }) // first film ever made was in 1888
      .withMessage('Release year must be a valid number.'),

    // mainActor is required
    body('mainActor')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Main actor is required.')
  ];
};

validate.checkMovieData = (req, res, next) => {
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
