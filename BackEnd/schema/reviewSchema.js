const Joi = require("joi");

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    review: Joi.string().required(),
    owner: Joi.string().hex().length(24)
})

module.exports = reviewSchema;