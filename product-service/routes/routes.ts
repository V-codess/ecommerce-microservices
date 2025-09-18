// src/routes/auth.js
import express from "express";
const router = express.Router();
import {getAllProducts, editProductDetails, createAProduct, getSingleProduct, deleteProduct} from '../controllers/products';
import {authenticateJWT} from '../middlewares/middleware';

router.get('/products', getAllProducts);
router.post('/create-product', authenticateJWT, createAProduct);
router.patch('/edit-product/:id', authenticateJWT,editProductDetails);
router.get('/product/:id', getSingleProduct);
router.delete('/delete-product/:id', authenticateJWT,deleteProduct);

export default router;
