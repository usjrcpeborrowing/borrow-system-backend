const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();

//socket io
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // your Angular app URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
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
// const usertypes = require("./routes/usertypes");
const report = require("./routes/report");
const transactions = require("./routes/transaction");
const inventoryreport = require("./routes/inventoryReport");
const loginRoute = require("./routes/login");
const notificationRoute = require("./routes/notifications");

const authenticate = require("./middlewares/authenticate");

/**
 * Io
 */
app.userSockets = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    console.log('user id', userId);
    app.userSockets[userId] = socket.id;
  }

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
    let userId = Object.keys(app.userSockets).find(
      (k) => app.userSockets[k] == socket.id
    );
    delete app.userSockets[userId];
    console.log(app.userSockets);
  });

});

/**
 * middleware
 */
app.use(express.json());
app.use(cors());
// Make io accessible to our router
app.use(function (req, res, next) {
  req.io = io;
  req.userSockets = app.userSockets;
  next();
});

/**
 * routes
 */
app.use("/api/login", loginRoute);
app.use(authenticate);
app.use("/api/equipment", equipmentRoute);
app.use("/api/equipmenttype", equipmenttypeRoute);
app.use("/api/borroweditems", borrowedItems);
app.use("/api/classschedule", class_schedule);
app.use("/api/users", users);
app.use("/api/department", department);
// app.use("/api/usertypes", usertypes);
app.use("/api/report", report);
app.use("/api/transaction", transactions);
app.use("/api/inventoryreport", inventoryreport);
app.use("/api/notification", notificationRoute);

try {
  mongoose.connect(process.env.DATABASE);
} catch (err) {
  console.log(err);
}

app.use(
  express.static(
    __dirname + "./../borrow-system-frontend/dist/usjr-borrowing-system"
  )
);
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname +
        "./../borrow-system-frontend/dist/usjr-borrowing-system/index.html"
    )
  );
});

server.listen(3000, (err) => {
  if (err) console.log("error");
  else console.log("listening to port 3000");
});
