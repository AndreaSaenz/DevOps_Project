const jwt = require("jsonwebtoken");

// Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  const bearerHeader = req.headers["Authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // if (typeof bearerHeader !== "undefined") {
  //   const token = bearerHeader.split(" ")[1];
  //   console.log(token);
  //   req.token = token;
  //   next();
  // } else {
  //   res.status(403).send({ mesagge: "Access denied" });
  //   return;
  // }

  // jwt.verify(token, "secretKey", (error, authData) => {
  //   if (error) {
  //     res.status(403);
  //   } else {
  //     res.send({ message: "Access aprove", authData: authData });
  //   }
  // });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
