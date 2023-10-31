const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDb = require("./config/database");

connectDb();
const server = express();
const adminController = require("./controllers/adminController");

server.use(express.json());
server.use(cors());
server.use(cookieParser());

server.use("/api/admin", adminController);

const PORT = 3005;

server.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
