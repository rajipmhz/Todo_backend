const express = require("express");
const sequelize = require("./config/database");
require("./models");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/userRoute");
const todoRoutes = require("./routes/todoRoute");
const subtaskRoutes = require("./routes/subtodoRoute");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("db error", err));

app.use("/auth", authRoute);
app.use("/todos", todoRoutes);
app.use("/todos", subtaskRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
