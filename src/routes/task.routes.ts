import express from "express";

import { authenticationMiddleware } from "../middleware";
import {
  createTask,
  getAlltasks,
  toggleTaskStatus,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAlltasks);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/update/:id").put(toggleTaskStatus);

export default taskRoutes;
