import { Router } from "express";
import {createOrder, getOrders} from "../controllers/orders"
import {authenticateJWT} from '../middlewares/middleware';

const router = Router();

router.post("/create-order", authenticateJWT, createOrder)
router.get("/orders", authenticateJWT, getOrders);

export default router;
