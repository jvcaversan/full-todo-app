import express, { Request, Response } from "express";
import dbConnect from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(express.json());

const PORT = 1337;

dbConnect();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/category", categoryRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server Running");
});
