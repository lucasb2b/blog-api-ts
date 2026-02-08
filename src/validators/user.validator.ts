import { body } from "express-validator";
import User from "../models/user";

export const createUserDataValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be a string")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide a valid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be a string")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
];

export const loginUserDataValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be a string"),
];

export const updateUserDataValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name should be a string")
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Provide a valid email")
    .normalizeEmail(),
];
