const Joi = require("joi");

const imageSchema = Joi.object({
    filename: Joi.string().allow("" , null),
    url: Joi.string().allow("" , null),
    mimetype: Joi.string().valid("image/jpeg" , "image/jpg" , "image/png" , "image/webp").allow("" , null),
    size: Joi.number().max(50 * 1024 * 1024).allow("" , null)
}).unknown();

const productSchema = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    price: Joi.number().required(),
    discountType: Joi.string().valid("percentage" , "fixed").required(),
    discountValue: Joi.number().required(),
    images: Joi.array().items(imageSchema).max(6),
    validUntil: Joi.date().greater("now").required(),
    catagory: Joi.string().valid("fashion" , "mobiles" , "electronics" , "home & furniters" , "appliances" , "toys").required(),
    stock: Joi.number().required(),
    owner: Joi.string().hex().length(24)
})

module.exports = productSchema;