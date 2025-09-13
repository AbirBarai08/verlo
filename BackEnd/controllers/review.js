const Products = require("../models/product.js");
const Reviews = require("../models/review.js");
const Feedbacks = require("../models/feedback.js");

module.exports.addReviews = async(req , res) => {
    const { productId, rating, review } = req.body;

    const newReview = new Reviews({
        review,
        rating,
        owner: req.user._id
    })

    await newReview.save();
    await Products.findByIdAndUpdate(productId, { $push: { reviews: newReview._id } });
    const product = await Products.findById(productId).populate("reviews");

    const ratings = product.reviews.map(review => Number(review.rating));
    const totalRating = ratings.reduce((acc , curr) => acc + curr , 0);
    const avgRating = (ratings.length ? Math.round((totalRating / ratings.length) * 10) / 10 : 0).toFixed(1);

    product.rating = avgRating;
    await product.save();

    return res.status(200).json({ message: "Review added successfully", type: "success" });
}

module.exports.deleteReviews = async(req , res) => {
    const { reviewId , productId } = req.query;
    const review = await Reviews.findById(reviewId);
    if(!review) {
        return res.status(404).json({   
            message: "Review not found",
            type: "error"
        });
    }
    if(!review.owner.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to delete this review",
            type: "error"
        });
    }
    
    await Reviews.findByIdAndDelete(reviewId);
    await Products.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });
    const product = await Products.findById(productId).populate("reviews");

    const ratings = product.reviews.map(review => Number(review.rating));
    const totalRating = ratings.reduce((acc , curr) => acc + curr , 0);
    const avgRating = (ratings.length ? Math.round((totalRating / ratings.length) * 10) / 10 : 0).toFixed(1);

    product.rating = avgRating;
    await product.save();

    return res.status(200).json({ message: "Review deleted successfully", type: "success" });
}

module.exports.addFeedbacks = async(req , res) => {
    const { productId , message } = req.body;
    const product = await Products.findById(productId);

    if(!product) {
        return res.status(404).json({
            message: "Product not found",
            type: "error"
        })
    }

    if(typeof message !== "string" || message.trim().length === 0) {
        return res.status(500).json({
            message: "FeedBack message not correct",
            type: "error"
        })
    }

    const newFeedback = new Feedbacks({
        message,
        owner: req.user._id,
    })
    
    await newFeedback.save();
    product.feedbacks.push(newFeedback._id);
    await product.save();

    return res.status(200).json({ message: "Feedback added successfully", type: "success" });
}

module.exports.deleteFeedbacks = async(req , res) => {
    const { feedbackId , productId } = req.query;
    const feedback = await Feedbacks.findById(feedbackId);
    if(!feedback) {
        return res.status(404).json({   
            message: "feedback not found",
            type: "error"
        });
    }
    if(!feedback.owner.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to delete this feedback",
            type: "error"
        });
    }
    await Feedbacks.findByIdAndDelete(feedbackId);
    await Products.findByIdAndUpdate(productId, { $pull: { feedbacks: feedbackId } });

    return res.status(200).json({ message: "Feedback deleted successfully", type: "success" });
}

module.exports.getProductReviews = async(req , res) => {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate({path: 'reviews', populate: { path: 'owner' }});
    if(!product) {
        return res.status(404).json({
            message: "Product not found",
            type: "error"
        });
    }

    return res.status(200).json({ reviews: product.reviews });
}