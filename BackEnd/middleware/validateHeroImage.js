const { heroImageSchema } = require("../schema/schema.js");

const validateHeroImage = (req , res , next) => {
    try {
        const parsedBody = JSON.parse(req.body.imageData);

        const image = {
            filename: req.file.filename || req.file.originalname || "",
            url: req.file.path || req.file.url || "",
            mimetype: req.file.mimetype,
            size: req.file.size
        }

        const payload = {
            ...parsedBody , image
        }

        const { error } = heroImageSchema.validate(payload , { abortEarly: false });

        if(error) {
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
};

module.exports = validateHeroImage;