import mongoose from "mongoose";

const database = async (url: string) => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(url)
    .then(() => console.log("Cart server is connected to the Mongo DB"))
    .catch((err) => console.log(err));
};

export default database;
