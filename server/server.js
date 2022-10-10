// const express = require("express");
// const app = express();
// const http = require("http");
// const PORT = 1133;
// const server = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the socket.io class",
//   });
// });

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// require("./utils/Db");
const express = require("express");
const app = express();
const http = require("http");
const PORT = 1133;
const server = http.createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("welcome to the socket.io class");
});

const url =
  "mongodb+srv://marketplace:marketplace@cluster0.bf5dp.mongodb.net/socketclass?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log("Connected to database");
});

const db = mongoose.connection;
db.on("open", () => {
  const observer = db.collection("user").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insect") {
      const newData = {
        name: change.fullDocument.name,
        _id: change.fullDocument._id,
        like: change.fullDocument.like,
      };
      io.emit("newEntry", newData);
    }
  });
});
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/user", require("./router/router"));
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
