const router = require('express').Router();
const genresController = require('../controllers/genresController');
const middleware = require('../middleware/routeErrorHandler');
const genreValidator = require('../middleware/genreValidator'); // We'll create this for validation

router.get('/', genresController.getAllGenres);

router.get('/:id', genresController.getGenreById);

router.post(
    '/',
    middleware.isAuthenticated,
    genreValidator.genreRules(),
    genreValidator.checkGenreData,
    genresController.createGenre
);

router.put(
    '/:id',
    middleware.isAuthenticated,
    genreValidator.genreRules(),
    genreValidator.checkGenreData,
    genresController.updateGenre
);

router.delete(
    '/:id',
    middleware.isAuthenticated,
    genresController.deleteGenre
);

module.exports = router;
