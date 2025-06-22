import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
    enum: ['pdf', 'ebook', 'audiobook','other'],
    default: 'pdf',
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
    default: 'https://www.bing.com/ck/a?!&&p=0ce7ec0c57a031cde878674575f65d8bdb314e994a7e5e249432f5f39603815bJmltdHM9MTc1MDQ2NDAwMA&ptn=3&ver=2&hsh=4&fclid=2f610555-41b1-6dbb-12c7-135e45b16fb5&u=a1L2ltYWdlcy9zZWFyY2g_cT1ib29rJTIwbG9nbyZGT1JNPUlRRlJCQSZpZD0wMjNBODc5NDE5RjZDMUZBOTJGNjQ3MTFDOTAxOTRBQ0U3QTgzQTNB&ntb=1',
    required: false,
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