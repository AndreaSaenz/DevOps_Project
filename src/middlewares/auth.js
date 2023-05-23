const jwt = require("jsonwebtoken");

// Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  const bearerHeader = req.headers["Authorization"];
  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
  } catch (error) {
    return res.status(401).json("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
