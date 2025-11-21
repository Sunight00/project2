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
    try {
        const actor = {
            fullName: req.body.fullName,
            gender: req.body.gender,
            age: req.body.age,
            nationality: req.body.nationality,
            knownFor: req.body.knownFor,
            yearsActive: req.body.yearsActive,
            awardsCount: req.body.awardsCount
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Actors")
            .insertOne(actor);

        if (result.acknowledged) {
            return res.status(201).json({
                message: "Actor created successfully",
                id: result.insertedId
            });
        } else {
            return res.status(500).json({ message: "Failed to create actor profile." });
        }

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


actorsController.updateActor = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const actorId = new ObjectId(req.params.id);

        const actor = {
            fullName: req.body.fullName,
            gender: req.body.gender,
            age: req.body.age,
            nationality: req.body.nationality,
            knownFor: req.body.knownFor,
            yearsActive: req.body.yearsActive,
            awardsCount: req.body.awardsCount
        };
        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Actors")
            .replaceOne({ _id: actorId }, actor);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Actor not found" });
        }
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: "Actor updated successfully" });
        }
        return res.status(200).json({ message: "No changes were made" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


actorsController.deleteActor = async (req, res) => {
    try {
        const actorId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Actors")
            .deleteOne({ _id: actorId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Actor not found" });
        }
        return res.status(200).json({ message: "Actor deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};




module.exports = actorsController;