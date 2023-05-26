const jwt = require("jsonwebtoken");

// Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  //const bearerHeader = req.headers["Authorization"];

  //console.log(token);
  //console.log(bearerHeader);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  
  //console.log('Antes de decoded');
  
  try {
    const onlyToken = token.split(" ");
    const decoded = jwt.verify(onlyToken[1], "secretKey");
    //console.log(decoded);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
  
};

module.exports = verifyToken;
