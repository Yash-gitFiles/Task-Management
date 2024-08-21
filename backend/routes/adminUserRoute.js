const express = require("express");
const {
  getAllUser,
  getParticularUserById,
  getParticularUserDeleteById,
  getParticularUserUpdateById,
} = require("../controller/adminUserController");

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getParticularUserById);
router.delete("/:id", getParticularUserDeleteById);
router.put("/:id", getParticularUserUpdateById);

module.exports = router;
