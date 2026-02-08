import { Router, Request, Response } from "express";
import blogRoutes from "./blogRoutes";
import userRoutes from "./userRoutes";

const apiRouter = Router();

apiRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to your Express API",
  });
});

apiRouter.use("/blogs", blogRoutes);
apiRouter.use("/users", userRoutes);

export default apiRouter;
