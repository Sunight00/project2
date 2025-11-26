const express = require('express');
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const movieValidator = require("../middleware/movieValidator");
const middleware = require('../middleware/routeErrorHandler');

router.get("/", moviesController.getAll)
router.get("/:id", moviesController.getSingle);
router.get("/genre/:genre", moviesController.getMoviesByGenre);
router.get("/actor/:actor", moviesController.getMoviesByActor);
router.post("/",middleware.isAuthenticated, movieValidator.movieRules(),movieValidator.checkMovieData, moviesController.createMovie);
router.put("/:id",middleware.isAuthenticated, movieValidator.movieRules(),movieValidator.checkMovieData, moviesController.updateMovie);
router.delete("/:id",middleware.isAuthenticated, moviesController.deleteMovie);


module.exports = router;