const bcrypt = require("bcryptjs");
const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        error: "Email already exists",
        success: false,
      });
    }

    const hasePassword = await bcrypt.hash(password, 10);
    const roleCount = await User.countDocuments({});
    const role = roleCount === 0 ? "admin" : "user";
    const newUser = new User({
      name,
      email,
      password: hasePassword,
      role,
    });
    newUser.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const userData = {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    };

    const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      userData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
}

module.exports = {
  signup,
  login,
};
