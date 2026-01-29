const express = require("express");
const sequelize = require("./config/database");
require("./models");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/userRoute");
const todoRoutes = require("./routes/todoRoute");
const subtaskRoutes = require("./routes/subtodoRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true               
  })
);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/auth", authRoute);
app.use("/todos", todoRoutes);
app.use("/todos", subtaskRoutes);

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error:", err));

  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
