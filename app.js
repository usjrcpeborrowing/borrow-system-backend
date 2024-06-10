const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require('dotenv').config()

/**
 * import routes
 */
const equipmentRoute = require("./routes/equipment");
const equipmenttypeRoute = require("./routes/equipmenttypes");
const borrowedItems = require("./routes/borrowedItems");
const class_schedule = require("./routes/classSchedule");
// const students = require("./routes/student");
// const instructor = require("./routes/instructor");
const users = require("./routes/users");
const department = require("./routes/department");
const usertypes = require("./routes/usertypes");
const report = require("./routes/report");
const transactions = require("./routes/transaction");
/**
 * middleware
 */
app.use(express.json());
app.use(cors());

/**
 * routes
 */
app.use("/api/equipment", equipmentRoute);
app.use("/api/equipmenttype", equipmenttypeRoute);
app.use("/api/borroweditems", borrowedItems);
app.use("/api/classschedule", class_schedule);
// app.use("/api/student", students);
// app.use("/api/instructor", instructor);
app.use("/api/users", users);
app.use("/api/department", department);
app.use("/api/usertypes", usertypes);
app.use("/api/report", report);
app.use("/api/transaction", transactions);
try {
  mongoose.connect(process.env.DATABASE);
} catch (err) {
  console.log(err)
}

app.use(express.static(__dirname + "./../borrow-system-frontend/dist/usjr-borrowing-system"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "./../borrow-system-frontend/dist/usjr-borrowing-system/index.html"));
});

app.listen(3000, (err) => {
  if (err) console.log("error");
  else console.log("listening to port 3000");
});
