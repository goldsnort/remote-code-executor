const express = require("express");
const { code } = require("../controller/code");
const router = express.Router();

router.post("/", code);

module.exports = router;
