import jwt from "jsonwebtoken";
import asyncHandler from "./asyncMiddleware.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Error, token failed!");
    }
  } else {
    res.status(401);
    throw new Error("Error, no matching authentication token!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Error, not authorized as admin!");
  }
};

export { protect, admin };
