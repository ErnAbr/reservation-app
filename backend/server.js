const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/database");
const { API } = require("./constants/constants");

require("dotenv").config();

connectDb();
const server = express();
const adminController = require("./controllers/adminController");

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(cookieParser());

server.use(API, adminController);

const PORT = 3005;

server.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
