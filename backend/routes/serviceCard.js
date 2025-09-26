const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");

// Stats routes
router.get("/stats", ctrl.getStats);
router.post("/stats", ctrl.createStat);
router.put("/stats/:id", ctrl.updateStat);
router.delete("/stats/:id", ctrl.deleteStat);

// Service Cards routes
router.get("/services", ctrl.getServiceCards);              // Changed from /service-cards to /services to match frontend
router.post("/services", ctrl.createServiceCard);
router.put("/services/:id", ctrl.updateServiceCard);
router.delete("/services/:id", ctrl.deleteServiceCard);

// Projects routes
router.get("/projects", ctrl.getProjects);
router.post("/projects", ctrl.createProject);
router.put("/projects/:id", ctrl.updateProject);
router.delete("/projects/:id", ctrl.deleteProject);

// Stack routes
router.get("/stack", ctrl.getStack);
router.post("/stack", ctrl.createStack);
router.put("/stack/:id", ctrl.updateStack);
router.delete("/stack/:id", ctrl.deleteStack);

module.exports = router;
