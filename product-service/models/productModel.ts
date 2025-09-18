import { model, Schema } from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
}
const schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  stock: {
    type: String,
    enum: ["full", "nil"]
  },
  price: {
    type: String,
  },
   description: {
    type: String,
  },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

const Products = model<IProduct>("products", schema);
export default Products;
