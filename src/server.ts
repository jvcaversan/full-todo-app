import express, { Request, Response } from "express";
import dbConnect from "./db";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

const PORT = 1337;

dbConnect();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server Running");
});
