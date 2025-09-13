const mongoose = require("mongoose");
const initData = require("./heroImg.js");
const initProduct = require("./product.js");
const initReview = require("./review.js");
const HeroImages = require("../models/heroImg.js");
const Products = require("../models/product.js");
const Reviews = require("../models/review.js");
const MONGO_URL = ("mongodb://127.0.0.1:27017/quickshop");

main()
.then(() => {
    console.log("connect to db");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await HeroImages.deleteMany({});
    await Products.deleteMany({});
    await Reviews.deleteMany({});
    await HeroImages.insertMany(initData.data);
    const products = await Products.insertMany(initProduct.data);
    const reviews = await Reviews.insertMany(initReview.data);

    const reviewIds = reviews.map(r => r._id);

    await Promise.all(
        products.map(product =>
            Products.findByIdAndUpdate(product._id, {
                $push: { reviews: { $each: reviewIds } }
            })
        )
    );
    console.log("data is initialized");
}

initDB();