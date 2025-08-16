import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authheader = req.headers["authorization"];
    if (!authheader || !authheader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, msg: "no token provided" });
    }
    const token = authheader.split("")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Unauthorized" });
  }
};
