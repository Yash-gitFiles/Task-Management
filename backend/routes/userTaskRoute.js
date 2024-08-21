const express = require("express");
const {
  getAllTask,
  getParticularTask,
  getParticularUpdateTask,
} = require("../controller/userTaskController");

const router = express.Router();

router.get("/", getAllTask);
router.get("/:id", getParticularTask);
router.put("/:id", getParticularUpdateTask);

module.exports = router;
