import mongoose from "mongoose";

const ProductModelSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  name: String,
  price: Number,
  review: Number,
  star: Number,
  value: Number,
  quantity: String,
});

const Product = mongoose.model('Product', ProductModelSchema);

export default Product;
