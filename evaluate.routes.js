const express = require("express");
const { evaluateController } = require("../controllers/evaluate.controller");

const router = express.Router();

router.post("/evaluate", evaluateController);

module.exports = router;
