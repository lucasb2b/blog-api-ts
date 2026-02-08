import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({
      status: "error",
      message: "Token not provided",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      id: new Types.ObjectId(decoded.id),
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};