const express = require('express');
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const movieValidator = require("../middleware/movieValidator");

router.get("/", moviesController.getAll)
router.get("/:id", moviesController.getSingle);
router.post("/",movieValidator.movieRules(),movieValidator.checkMovieData, moviesController.createMovie);
router.put("/:id",movieValidator.movieRules(),movieValidator.checkMovieData, moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);


module.exports = router;