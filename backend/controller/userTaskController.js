const { Task } = require("../models/taskModels");

async function getAllTask(req, res) {
  const userId = req.user.id;
  try {
    const task = await Task.find({ assignTo: userId });
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(200).json({
      message: "Task found successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
}

async function getParticularTask(req, res) {
  const taskId = req.params.id;
  try {
    if (!taskId) {
      return res.status(400).json({
        message: "Task id is required",
        success: false,
      });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Task received successfully",
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching particular task",
      success: false,
    });
  }
}

async function getParticularUpdateTask(req, res) {
  const taskId = req.params.id;
  const { completed } = req.body;
  try {
    if (!taskId) {
      return res.status(400).json({
        message: "Task id is required",
        success: false,
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    }

    await Task.findByIdAndUpdate(taskId, { completed }, { new: true });
    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching particular task",
      success: false,
    });
  }
}

module.exports = {
  getAllTask,
  getParticularTask,
  getParticularUpdateTask,
};
