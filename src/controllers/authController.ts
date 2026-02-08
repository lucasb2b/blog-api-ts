import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { authService } from "../services/authService";
import { Serializer } from "../serializers/serializers";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
      }

      const user = await authService.register(req.body);

      return res.status(201).json({
        status: "success",
        data: Serializer.user(user),
      });
    } catch (err: any) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const { user, token } = await authService.login(email, password);

      return res.json({
        status: "success",
        data: {
          token,
          user: Serializer.user(user),
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async profile(req: Request, res: Response) {
    const user = await authService.getProfile(req.user!.email);

    return res.json({
      status: "success",
      data: Serializer.user(user),
    });
  },
};