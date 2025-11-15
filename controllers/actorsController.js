const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const actorsController ={}

actorsController.getAll = async (req, res) => {
    try {
        const actors = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Actors")
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actors);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

actorsController.getSingle = async (req, res) => {
    try {
        const actorId = new ObjectId(req.params.id);

        const actor = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Actors")
            .findOne({ _id: actorId });
        if (!actor) {
            return res.status(404).json({ message: "User not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


actorsController.createActor = async (req, res) => {
    //#swagger.tags = ['Users']
    const actor = {
        fullName: req.body.fullName,
        gender: req.body.gender,
        age: req.body.age,
        nationality: req.body.nationality,
        knownFor: req.body.knownFor,
        yearsActive: req.body.yearsActive,
        awardsCount: req.body.awardsCount
    };

    const result = await mongodb.getDatabase().db("Cinema").collection("Actors").insertOne(actor);
    if (result.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error while creating actor profile.");
    }
    
}

actorsController.updateActor = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const actor = {
        fullName: req.body.fullName,
        gender: req.body.gender,
        age: req.body.age,
        nationality: req.body.nationality,
        knownFor: req.body.knownFor,
        yearsActive: req.body.yearsActive,
        awardsCount: req.body.awardsCount
    };
    const result = await mongodb.getDatabase().db("Cinema").collection("Actors").replaceOne({_id: userId}, actor);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while updating the profile.");
    }
    
}

actorsController.deleteActor = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("Cinema").collection("Actors").deleteOne({_id: userId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while deleting actor profile.");
    }
    
}



module.exports = actorsController;