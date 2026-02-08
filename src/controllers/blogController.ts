import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Types } from "mongoose";

import { blogService } from "../services/blogService";
import { Serializer } from "../serializers/serializers";

/*interface AuthRequest extends Request {
  user?:{
    _id: Types.ObjectId;
    email: string;
    role: string;
  };
}*/

export const BlogController = {
  async getAll(req: Request, res: Response) {
    try{
      const blogs = await blogService.findAll();

      return res.json({
        status: "success",
        data: Serializer.blogs(blogs),
      });
    }catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async create(req: Request, res: Response){
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
      }

      if(!req.user){
        return res.status(401).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const blog = await blogService.create({
        ...req.body,
        author: req.user.id,
      });

      return res.status(201).json({
        status: "success",
        data: Serializer.blog(blog),
      });
    }catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async getById(req: Request<{ id: string}>, res: Response){
    try{
      const blog = await blogService.findBy(req.params.id);

      return res.json({
        status: "success",
        data: Serializer.blog(blog),
      });
    }catch(err: any){
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async update(req: Request<{ id: string}>, res: Response){
    try {
      const blog = await blogService.update(req.params.id, req.body);

      return res.json({
        status: "success",
        data: Serializer.blog(blog),
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  async delete(req: Request<{ id: string}>, res: Response){
    try {
      await blogService.delete(req.params.id);

      return res.json({
        status: "success",
        message: "Blog deleted successfully",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },
}