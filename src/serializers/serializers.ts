import { IUserDocument } from "../models/user";
import { IBlogDocument } from "../models/blog";
import { Types } from "mongoose";

// Função genérica de serialização

function abstractSerializer<T>(
  entity: T,
  fields: (keyof T)[]
): Partial<T> {
  const data: Partial<T> = {};

  fields.forEach((field) => {
    if (entity[field] !== undefined) {
      data[field] = entity[field];
    }
  });

  return data;
}

// User

export const Serializer = {
  user(user: IUserDocument | null){
    if (!user) return null;

    return{
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },

  users(users: IUserDocument[]){
    return users.map((user) => Serializer.user(user));
  },

  // Blog
  blog(blog: IBlogDocument | null){
    if (!blog) return null;

    return{
      id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      image: blog.image,
      tags: blog.tags,
      author: blog.author,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  },

  blogs(blogs: IBlogDocument[]){
    return blogs.map((blog) => Serializer.blog(blog));
  },
};