const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/homePageController");

// HERO routes
router.get("/hero", ctrl.getHero);
router.post("/hero", ctrl.createHero);
router.put("/hero/:id", ctrl.updateHero);
router.delete("/hero/:id", ctrl.deleteHero);

// FEATURES routes
router.get("/features", ctrl.getFeatures);
router.post("/features", ctrl.createFeature);
router.put("/features/:id", ctrl.updateFeature);
router.delete("/features/:id", ctrl.deleteFeature);

// SERVICES routes
router.get("/services", ctrl.getServices);
router.post("/services", ctrl.createService);
router.put("/services/:id", ctrl.updateService);
router.delete("/services/:id", ctrl.deleteService);

// TOOLS routes
router.get("/tools", ctrl.getTools);
router.post("/tools", ctrl.createTool);
router.put("/tools/:id", ctrl.updateTool);
router.delete("/tools/:id", ctrl.deleteTool);

// INDUSTRIES routes
router.get("/industries", ctrl.getIndustries);
router.post("/industries", ctrl.createIndustry);
router.put("/industries/:id", ctrl.updateIndustry);
router.delete("/industries/:id", ctrl.deleteIndustry);

// ADDITIONAL INDUSTRY IMAGES routes
router.get("/additional-industry-images", ctrl.getAdditionalIndustryImages);
router.post("/additional-industry-images", ctrl.createAdditionalIndustryImage);
router.put("/additional-industry-images/:id", ctrl.updateAdditionalIndustryImage);
router.delete("/additional-industry-images/:id", ctrl.deleteAdditionalIndustryImage);

// CTA routes
router.get("/ctas", ctrl.getCTAs);
router.post("/ctas", ctrl.createCTA);
router.put("/ctas/:id", ctrl.updateCTA);
router.delete("/ctas/:id", ctrl.deleteCTA);

module.exports = router;
