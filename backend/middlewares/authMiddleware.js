import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    req.user = user;
    // console.log('sak');
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: "Invalid token, Try logging in again" });
  }
};

export default authMiddleware;
