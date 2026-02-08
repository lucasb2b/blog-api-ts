import { Schema, model, Document, Types } from "mongoose";

/* Interfaces */

export interface IBlog {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  author: Types.ObjectId;
}

export interface IBlogDocument extends IBlog, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Schema

const blogSchema = new Schema<IBlogDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Model

const Blog = model<IBlogDocument>("Blog", blogSchema);

export default Blog;
