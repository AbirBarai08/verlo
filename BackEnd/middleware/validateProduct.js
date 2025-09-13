const { productSchema } = require("../schema/schema.js");

const validateProduct = (req, res, next) => {
  try {
    const parsedBody = JSON.parse(req.body.productData);

    const images = (req.files || []).map(file => ({
      filename: file.filename || file.originalname || "",
      url: file.path || file.url || "",
      mimetype: file.mimetype,
      size: file.size
    }));

    const payload = {
      ...parsedBody,
      images
    };

    const { error } = productSchema.validate(payload, { abortEarly: false });

    if (error) {
      const validationError = new Error(error.details.map(e => e.message).join(", "));
      validationError.status = 400;
      return next(validationError);
    }

    next();
  } catch (err) {
    const parseError = new Error("Invalid JSON in request body");
    parseError.status = 400;
    return next(parseError);
  }
};

module.exports = validateProduct;