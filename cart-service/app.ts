import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./config/connectdb";
// import authRoute from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 8084;
app.use(cors());
app.use(express.json());
// app.use("/api", authRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("hi! this is cart services");
});

const startServer = async () => {
  try {
    const url : string = process.env.MONGOKEY || "";
    // await database(url);
    app.listen(port, () => {
      console.log("Server started and listening at", port);
    });
  } catch (error) {
    console.log("Err: Unable to connect DB", error);
  }
};

startServer();
