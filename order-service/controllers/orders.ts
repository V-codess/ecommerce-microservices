import { Request, Response } from "express";
import pool from "../config/connectdb";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const result = await pool.query(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, productId, quantity]
    );
    console.log(req.user);
    return res.json({
      message: "heres your order created!!",
      data: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating order" });
  }
};

export const editOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "UPDATE orders SET product_id = $1, quantity = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [productId, quantity, orderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found or not yours" });
    }

    return res.json({
      message: "✅ Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating order" });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM orders");
  return res.json(result.rows);
};

module.exports = { createOrder, getOrders };
