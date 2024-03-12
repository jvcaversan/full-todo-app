import express from "express";

import { authenticationMiddleware } from "../middleware";
import {
  createTask,
  deleteTask,
  getAllTasksByCategory,
  getAlltasks,
  toggleTaskStatus,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAlltasks);
taskRoutes.route("/task-by-categories/:id").get(getAllTasksByCategory);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/update/:id").put(toggleTaskStatus);
taskRoutes.route("/:id").delete(deleteTask);

export default taskRoutes;
