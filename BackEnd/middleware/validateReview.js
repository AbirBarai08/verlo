const { reviewSchema } = require("../schema/schema.js");

const validateReview = (req , res , next) => {
    try{
        const rating = parseInt(req.body.rating);
        const review = req.body.review;

        const { error } = reviewSchema.validate({ rating , review });

        if (error) {
            const validationError = new Error(error.details.map(e => e.message).join(", "));
            validationError.status = 400;
            return next(validationError);
        }

        next();
    } catch(err) {
        const parseError = new Error("Invalid JSON in request body");
        parseError.status = 400;
        return next(parseError);
    }
}

module.exports = validateReview;