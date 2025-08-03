import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header or cookie
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;

    // If no token found
    if (!token) {
      return res.status(401).json({
        msg: "error",
        error: "Access Denied. No token provided.",
        data: null,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;

    // Proceed to next middleware
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "error",
      error: "Invalid or expired token",
      data: null,
    });
  }
};

export default authMiddleware;
