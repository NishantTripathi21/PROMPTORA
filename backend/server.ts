import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("server is live");
});

// All routes below this line will require authentication
app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
