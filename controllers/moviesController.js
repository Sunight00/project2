const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const moviesController ={}

moviesController.getAll = async (req, res) => {
    try {
        const movies = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

moviesController.getSingle = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);

        const movie = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


moviesController.createMovie = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            mainActor: req.body.mainActor
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .insertOne(movie);

        if (result.acknowledged) {
            res.status(201).json({ message: "Movie created successfully", id: result.insertedId });
        } else {
            res.status(500).json({ message: "Failed to create movie" });
        }

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


moviesController.updateMovie = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const movieId = new ObjectId(req.params.id);

        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            mainActor: req.body.mainActor
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .replaceOne({ _id: movieId }, movie);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: "Movie updated successfully" });
        }

        return res.status(200).json({ message: "No changes were made" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


moviesController.getMoviesByGenre = async (req, res) =>{
    const genre = req.params.genre;
    try {
        const movies = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .find({ genre: genre })
            .toArray();
        if (movies.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        
        res.status(200).json(movies);
        }

    catch (error) {
        res.status(500).json({ message: error.toString() });
    }
}

moviesController.getMoviesByActor = async (req, res) =>{
    const actor = req.params.actor;
    try {
        const movies = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .find({ mainActor: actor })
            .toArray();
        if (movies.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
        }

    catch (error) {
        res.status(500).json({ message: error.toString() });
    }
}


moviesController.deleteMovie = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .deleteOne({ _id: movieId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: "Movie deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};




module.exports = moviesController;