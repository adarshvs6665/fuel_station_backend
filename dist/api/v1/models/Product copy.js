"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductModelSchema = new mongoose_1.default.Schema({
    id: Number,
    imageUrl: String,
    name: String,
    price: Number,
    review: Number,
    star: Number,
    value: Number,
    quantity: Number,
});
const ProductModel = mongoose_1.default.model('ProductModel', ProductModelSchema);
exports.default = ProductModel;
