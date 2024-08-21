const { Task } = require("../models/taskModels");
const { User } = require("../models/userModels");

async function createTask(req, res) {
  const { title, desc, email } = req.body;

  try {
    const findUser = await User.findOne({
      email,
    });

    if (!findUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const data = new Task({
      title,
      desc,
      assignTo: findUser._id,
      email: findUser.email,
    });

    data.save();
    res.json({ message: "Task created successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating task",
      success: false,
    });
  }
}

async function getAllUserTask(_, res) {
  try {
    const tasks = await Task.find({}).populate("assignTo");
    res.status(200).json({
      message: "Tasks retrieved successfully",
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving tasks",
      success: false,
    });
  }
}

async function deleteTask(req, res) {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    await Task.findByIdAndDelete(userId);
    return res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      success: false,
    });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.id;
  const { title, desc, email, completed } = req.body;
  try {
    if (!taskId) {
      return res
        .status(404)
        .json({ message: "TaskId is required", success: false });
    }

    if (email) {
      const findUser = await User.findOne({ email });
      if (!findUser) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
    }

    const foundTask = await Task.findById(taskId);
    if (!foundTask) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    const updateData = {
      title,
      desc,
      assignTo: foundTask.assignTo || findUser._id,
      completed,
      email: email || foundTask.email,
    };

    await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task",
      success: false,
    });
  }
}

module.exports = {
  createTask,
  getAllUserTask,
  deleteTask,
  updateTask,
};
