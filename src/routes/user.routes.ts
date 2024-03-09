import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/create").post(createUser);
// userRoutes.route("/create").put(updateUser);
// userRoutes.route("/create").delete(deleteUser);

userRoutes.route("/login").post(loginUser);

export default userRoutes;
