// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check for token in the Authorization header
  const token = req.header("Authorization");
  if (!token) {
    // If there's no token, return an access denied response
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token using your secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified token data to the request object for use in subsequent routes
    req.admin = verified;

    // Call next() to move to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, return an invalid token response
    res.status(400).json({ message: "Invalid Token" });
  }
};
