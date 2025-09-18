import express, { Request, Response } from "express";
import Products from "../models/productModel";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json({ message: "Your Products", data: allProducts });
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
};

export const createAProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price, stock } = req.body;
    const product = new Products({
      name: name,
      category: category,
      description: description,
      price: price,
      stock: stock,
    });
    await product.save();
    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res.status(500).json({ message: "Error creating products" });
  }
};

export const editProductDetails = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    const findProduct = await Products.findOne({ _id: id });
    if (!findProduct) {
      return res.status(401).json({ message: "No Product found" });
    }
    const product = await Products.updateOne({
      name: name,
      description: description,
      price: price,
      stock: stock,
    });
    return res.status(201).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProduct = await Products.findOne({ _id: id });
    if (!findProduct) {
      return res.status(401).json({ message: "No Product found" });
    }
    return res.status(201).json({ message: "Product updated", findProduct });
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProduct = await Products.findOneAndDelete({ _id: id });
    if (!findProduct) {
      return res.status(401).json({ message: "No Product found" });
    }
    return res.status(201).json({ message: "Product updated", findProduct });
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
};

module.exports = {
  getAllProducts,
  createAProduct,
  editProductDetails,
  getSingleProduct,
  deleteProduct,
};
