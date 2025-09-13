const Joi = require('joi');

const validateSchema = schema => {
    return (req , res , next) => {
        const fields = Object.keys(schema.describe().keys);

        for(let field of fields) {
            const { error } = schema.extract(field).validate(req.body[field]);

            if(error) {
                const detail = error.details[0];
                const message = detail.context?.messages?.[0] || detail.message;

                const err = new Error();
                err.message = message;
                err.status = 400;
                next(err);
            }
        }

        next();
    }
}

module.exports = validateSchema;