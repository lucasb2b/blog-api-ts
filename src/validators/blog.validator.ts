import { body } from "express-validator";

export const createBlogDataValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be a string")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description should be a string")
    .trim(),
];

export const updateBlogDataValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title should be a string")
    .trim(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description should be a string")
    .trim(),
];
