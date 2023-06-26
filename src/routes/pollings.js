const express = require("express");
const router = express.Router();
const {
  getAllPollings,
  getDetailPolling,
  createPolling,
  updatePolling,
  deletePolling,
} = require("../controllers/pollings_controller");

router.get("/", getAllPollings);
router.get("/:id", getDetailPolling);
router.post("/", createPolling);
router.put("/:id", updatePolling);
router.delete("/:id", deletePolling);

module.exports = router;
