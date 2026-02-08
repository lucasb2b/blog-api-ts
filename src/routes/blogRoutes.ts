import { Router } from "express";
import { BlogController } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createBlogDataValidator,
  updateBlogDataValidator,
} from "../validators/blog.validator";

const router = Router();

router
  .route("/")
  .get(BlogController.getAll)
  .post(
    authMiddleware,
    createBlogDataValidator,
    BlogController.create
  );

router
  .route("/:id")
  .get(BlogController.getById)
  .put(
    authMiddleware,
    updateBlogDataValidator,
    BlogController.update
  )
  .delete(
    authMiddleware,
    BlogController.delete
  );

export default router;
