const express = require('express');
const router = express.Router();
const actorsController = require("../controllers/actorsController");
const actorValidator = require("../middleware/actorValidator");

router.get("/", actorsController.getAll)
router.get("/:id", actorsController.getSingle);
router.post("/",actorValidator.actorRules(),actorValidator.checkActorData, actorsController.createActor);
router.put("/:id",actorValidator.actorRules(),actorValidator.checkActorData, actorsController.updateActor);
router.delete("/:id", actorsController.deleteActor);


module.exports = router;