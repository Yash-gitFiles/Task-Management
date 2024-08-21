const express = require("express");
const {
  createTask,
  getAllUserTask,
  deleteTask,
  updateTask,
} = require("../controller/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllUserTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

module.exports = router;
