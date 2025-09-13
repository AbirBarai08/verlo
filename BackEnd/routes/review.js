const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const validateReview = require("../middleware/validateReview");
const wrapAsync = require("../Utils/wrapAsync.js");
const reviewController = require("../controllers/review.js");

//reviews
router.post("/addreview" , isLoggedin, validateReview, wrapAsync(reviewController.addReviews))
router.delete("/deletereview" , isLoggedin, wrapAsync(reviewController.deleteReviews))
router.get("/:id" , isLoggedin, wrapAsync(reviewController.getProductReviews))

//feedbacks
router.post("/addfeedback" , isLoggedin , wrapAsync(reviewController.addFeedbacks))
router.delete("/deletefeedback" , isLoggedin, wrapAsync(reviewController.deleteFeedbacks))

module.exports = router;