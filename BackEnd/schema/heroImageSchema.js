const Joi = require("joi");

const imageSchema = Joi.object({
    filename: Joi.string().allow("" , null),
    url: Joi.string().allow("" , null),
    mimetype: Joi.string().valid("image/jpeg" , "image/jpg" , "image/png" , "image/webp").allow("" , null),
    size: Joi.number().max(50 * 1024 * 1024).allow("" , null)
}).unknown();

const heroImageSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    product: Joi.string().allow("" , null),
    discountType: Joi.string().valid("percentage" , "fixed").required(),
    discountValue: Joi.number().required(),
    image: imageSchema,
    endDate: Joi.date().greater("now").required(),
    catagory: Joi.string().valid("fashion" , "mobiles" , "electronics" , "home & furniters" , "appliances" , "toys").required(),
})

module.exports = heroImageSchema;