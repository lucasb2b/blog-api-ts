import { Request, Response } from "express";
import { userService } from "../services/userService";
import { Serializer } from "../serializers/serializers";

export const UserController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAll();

      return res.json({
        status: "success",
        data: Serializer.users(users),
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await userService.getById(req.params.id);

      return res.json({
        status: "success",
        data: Serializer.user(user),
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async create(req: Request, res: Response){
    try{
      const user = await userService.create(req.body);

      return res.status(201).json({
        status: "success",
        data: Serializer.user(user),
      });
    } catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async update(req: Request<{ id: string}>, res: Response){
    try{
      const user = await userService.update(req.params.id, req.body);

      return res.json({
        status: "success",
        data: Serializer.user(user),
      });
    } catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  },

  async delete(req: Request<{ id: string}>, res: Response){
    try{
      const user = await userService.delete(req.params.id);

      return res.json({
        status: "success",
        data: Serializer.user(user),
      });
    }catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  },
};
