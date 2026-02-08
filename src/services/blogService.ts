import Blog from "../models/blog";
import { CreateBlogDTO, UpdateBlogDTO } from "../dto/blogDTO.dto";

export const blogService = {
  create: async (data: CreateBlogDTO) => {
    return await Blog.create(data);
  },

  findAll: async () => {
    return await Blog.find().populate("author");
  },

  findBy: async (id: string) => {
    return await Blog.findById(id).populate("author");
  },

  update: async (id: string, data: UpdateBlogDTO) => {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string) => {
    return await Blog.findByIdAndDelete(id);
  },
};
