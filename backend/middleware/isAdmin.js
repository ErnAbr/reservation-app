const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    const jwtSecret = process.env.JWT_SECRET;
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden: Not enough privileges" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = isAdmin;
