import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./config/connect";
import authRoute from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use("/api", authRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("hi! auth services");
});

const startServer = async () => {
  try {
    const url : string = process.env.MONGOKEY || "";
    await database(url);
    app.listen(port, () => {
      console.log("Server started and listening at", port);
    });
  } catch (error) {
    console.log("Err: Unable to connect DB", error);
  }
};

startServer();
