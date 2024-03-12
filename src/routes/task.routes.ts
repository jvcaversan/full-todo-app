import express from "express";

import { authenticationMiddleware } from "../middleware";
import {
  createTask,
  // deleteTask,
  getAllCompletedTasks,
  getAllTasksByCategory,
  getAlltasks,
  getTasksForToday,
  toggleTaskStatus,
  updateTask,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAlltasks);
taskRoutes.route("/task-by-categories/:id").get(getAllTasksByCategory);
taskRoutes.route("/completed").get(getAllCompletedTasks);
taskRoutes.route("/today").get(getTasksForToday);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/update/:id").put(toggleTaskStatus);
taskRoutes.route("/edit/:id").put(updateTask);
// taskRoutes.route("/:id").delete(deleteTask);

export default taskRoutes;
