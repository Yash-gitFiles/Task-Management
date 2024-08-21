const { Task } = require("../models/taskModels");
const { User } = require("../models/userModels");
const bcrypt = require("bcryptjs");

async function getAllUser(_, res) {
  try {
    const users = await User.find({ role: "user" });
    if (!users) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", success: false });
  }
}

async function getParticularUserById(req, res) {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", success: false });
  }
}

async function getParticularUserDeleteById(req, res) {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    const userOrNot = await User.findById(id);

    if (!userOrNot) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    await User.findByIdAndDelete(id);

    await Task.deleteMany({ assignTo: id });

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", success: false });
  }
}

async function getParticularUserUpdateById(req, res) {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    // If email is provided, check if it already exists
    if (email) {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() !== id) {
        return res
          .status(400)
          .json({ message: "Email already exists.", success: false });
      }
    }

    // Prepare update data
    const updateData = { name, email };

    // Only hash and include password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

module.exports = {
  getAllUser,
  getParticularUserById,
  getParticularUserDeleteById,
  getParticularUserUpdateById,
};
