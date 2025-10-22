const express = require("express");
const router = express.Router();
const projectDetailsController = require("../controllers/projectDetailsController");

router.post("/", projectDetailsController.createProjectDetails);
router.get("/", projectDetailsController.getAllProjectDetails);
router.get("/:id", projectDetailsController.getProjectDetailsById);
router.put("/:id", projectDetailsController.updateProjectDetails);
router.delete("/:id", projectDetailsController.deleteProjectDetails);

module.exports = router;
