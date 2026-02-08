import { Router, Response, Request } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
  createUserDataValidator,
  loginUserDataValidator,
} from "../validators/user.validator";

const userRoutes = Router();

userRoutes.get("/test", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// Auth
userRoutes.post(
  "/register",
  createUserDataValidator,
  AuthController.register
);

userRoutes.post(
  "/login",
  loginUserDataValidator,
  AuthController.login
);

userRoutes.get(
  "/profile",
  authMiddleware,
  AuthController.profile
);

// Users (admin / protegidos)
userRoutes.get(
  "/",
  authMiddleware,
  adminMiddleware,
  UserController.getAllUsers
);

userRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  UserController.getById
);

userRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  UserController.update
);

userRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  UserController.delete
);


export default userRoutes;
