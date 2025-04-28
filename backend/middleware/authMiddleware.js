const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the "Authorization" header
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    req.admin = verified; // Store the verified admin data in the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Token error:", error);  // Log any errors with the token
    res.status(400).json({ message: "Invalid Token" });
  }
};
