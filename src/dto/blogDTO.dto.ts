import { Types } from "mongoose";

export interface CreateBlogDTO {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  author: Types.ObjectId;
}

export interface UpdateBlogDTO {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
}

export interface BlogResponseDTO {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}