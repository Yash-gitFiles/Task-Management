const express = require("express");
const commonRoute = require("./routes/commonRoute");
const taskRoute = require("./routes/taskRoute");
const connectionToDB = require("./db/connection");
const { checkAdminOrNot, userTask } = require("./middleware/validation");
const adminUserRoute = require("./routes/adminUserRoute");
const userTaskRoute = require("./routes/userTaskRoute");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());
app.use("/", commonRoute);
app.use("/userTask", userTask, userTaskRoute);
app.use("/task", checkAdminOrNot, taskRoute);
app.use("/admin", checkAdminOrNot, adminUserRoute);

app.listen(8000, () => {
  connectionToDB();
  console.log("Server is running on port 8000");
});
