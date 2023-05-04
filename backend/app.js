const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const port = 3000;

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

app.get('/', (req, res) => {
  res.send('Hello chat!');
});

server.listen(port, () => {
  console.log("Example app listening on port " + port + "! Visit http://localhost:" + port + " in your browser.");
});
