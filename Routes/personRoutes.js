const express = require("express");
const router = express.Router();
const personController = require("../Controller/personController");
const { jwtAuthMiddleware } = require("../jwt");

router.get("/", personController.getAllPersons);
router.post("/signup", personController.createPerson);
router.post("/login", personController.loginPerson);

router.get("/profile", jwtAuthMiddleware, personController.profile);
router.get("/:workType", personController.getPersonByWork);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;
