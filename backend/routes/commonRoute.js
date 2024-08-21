const express = require("express");
const { signup, login } = require("../controller/commonController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validation");

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
