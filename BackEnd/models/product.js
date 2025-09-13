const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("./review.js");

const imageSchema = new Schema({
  filename: {
    type: String,
  },
  url: {
    type: String,
  },
  mimetype: {
    type: String,
    enum: ["image/jpeg" , "image/jpg" , "image/png" , "image/webp"],
  },
  size: {
    type: Number,
    max: 50 * 1024 * 1024
  }
});

const productSchema = new Schema({
    name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    default: null,
    required: true,
  },
  discountValue: {
    type: Number,
    default: null,
    required: true,
  },
  images: [imageSchema],
  validUntil: {
    type: Date, 
    default: null,
    required: true,
  },
  catagory: {
    type: String,
    enum: ["fashion" , "mobiles" , "electronics" , "home & furniters" , "appliances" , "toys"],
    default: null,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Reviews",
  }],
  feedbacks: [{
    type: Schema.Types.ObjectId,
    ref: "Feedbacks",
  }]
})

const Products = mongoose.model("Products" , productSchema);
module.exports = Products;