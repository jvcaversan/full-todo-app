import express from "express";

import { authenticationMiddleware } from "../middleware";
import { createTask, getAlltasks } from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAlltasks);
taskRoutes.route("/create").post(createTask);
// categoryRoutes.route("/:id").get(getCategoryById);
// categoryRoutes.route("/:id").delete(deleteCategory);
// categoryRoutes.route("/update").put(updateCategory);

export default taskRoutes;
