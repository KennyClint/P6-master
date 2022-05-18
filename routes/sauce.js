const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.getAllSauce);
router.post("/", sauceCtrl.createSauce);
router.get("/:id", sauceCtrl.getOneSauce);

module.exports = router;