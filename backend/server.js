const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/database");
const { API } = require("./constants/constants");
const { ADMIN_API } = require("./constants/constants");
const { ORIGIN } = require("./constants/constants");

require("dotenv").config();

connectDb();
const server = express();
const securityController = require("./controllers/securityController");
const adminController = require("./controllers/adminController");

server.use(express.json());
server.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
server.use(cookieParser());

server.use(API, securityController);
server.use(ADMIN_API, adminController);

const PORT = 3005;

server.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
