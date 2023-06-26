const express = require("express");
const router = express.Router();
const {
  getAllOptions,
  getDetail,
  updatePointOption,
} = require("../controllers/polling_options_controller");

router.get("/", getAllOptions);
router.get("/:id", getDetail);
router.put("/:id", updatePointOption);

module.exports = router;
