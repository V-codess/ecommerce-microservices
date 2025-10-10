import express from "express";
import pool from "./config/connectdb";
import dotenv from "dotenv";
import orderRoutes from "./routes/router";
import {Request, Response} from "express"
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8083;
app.use("/api", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hi! order services");
});

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      product_id VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      status VARCHAR(50) DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ Orders table ready");
};

app.listen(PORT, async () => {
  await createTable();
  console.log(`🚀 Order Service running on port ${PORT}`);
});
