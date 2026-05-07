const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    // ✅ Extract actual token
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // helpful debug
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;