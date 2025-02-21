import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
    enum: ['pdf', 'ebook', 'audiobook'],
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  college: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  subject:{
    type:String,
    required:true,
  },
  download_link: {
    type: String,
    required: false,
  },
  isFree: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;