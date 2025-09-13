const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const heroImgSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    product: {
        type: String,
    },
    image : imageSchema,
    catagory: {
        type: String,
        enum: ["fashion" , "mobiles" , "electronics" , "home & furniters" , "appliances" , "toys"],
        default: null,
        required: true,
    },
    isActive : {
        type : Boolean,
        default : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    endDate : {
        type : Date,
        required : true,
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
})

const HeroImages = mongoose.model("HeroImages" , heroImgSchema);
module.exports = HeroImages;