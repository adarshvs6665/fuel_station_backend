import mongoose from "mongoose";

const ProductModelSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  name: String,
  price: Number,
  review: Number,
  star: Number,
  value: Number,
  quantity: Number,
});

const ProductModel = mongoose.model('ProductModel', ProductModelSchema);

export default ProductModel;
