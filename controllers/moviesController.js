const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const actorsController ={}

actorsController.getAll = async (req, res) => {
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

actorsController.getSingle = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);

        const movie = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("movies")
            .findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({ message: "User not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


actorsController.createMovie = async (req, res) => {
    //#swagger.tags = ['Users']
const movie = {
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    mainActor: req.body.mainActor
};


    const result = await mongodb.getDatabase().db("Cinema").collection("movies").insertOne(movie);
    if (result.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error while creating actor profile.");
    }
    
}

actorsController.updateMovie = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        mainActor: req.body.mainActor
    };

    const result = await mongodb.getDatabase().db("Cinema").collection("movies").replaceOne({_id: userId}, movie);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while updating the profile.");
    }
    
}

actorsController.deleteMovie = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("Cinema").collection("movies").deleteOne({_id: userId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while deleting actor profile.");
    }
    
}



module.exports = actorsController;