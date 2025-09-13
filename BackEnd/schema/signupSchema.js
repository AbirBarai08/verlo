const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().required()
    .custom((value , helpers) => {
        const errors = [];

        if(value.length < 3 || value.length > 30) {
            errors.push("Username must be between 3 to 30 characters")
        }

        if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            errors.push("Username must be contain letters , numbers and underscores")
        }

        if(errors.length > 0){
            return helpers.error("any custom" , { messages : errors })
        }

        return value;
    })
    .messages({
        "string empty" : "Username is required",
        "any required" : "Username is required",
        "any.custom" : "{{#messages}}"
    }),

    email: Joi.string().email().required()
    .messages({
        'string.base' : 'Email must be a text',
        'string.empty' : 'Email must be required',
        'string.email' : 'Email must be a valid email address',
        'any.required' : 'Email is required'
    }),

    password: Joi.string().required()
    .custom((value , helpers) => {
        const errors = [];

        if(value.length < 8 || value.length > 12) {
            errors.push("Password must be between 8 to 12 characters")
        }

        if(!/[A-Z]/.test(value)) {
            errors.push("Password must be contain at least one uppercase letter")
        }

        if(!/[a-z]/.test(value)) {
            errors.push("Password must be contain at least one lowercase letter")
        }

        if(!/[0-9]/.test(value)) {
            errors.push("Password must be contain at least one digit")
        }

        if(!/[!@#$%^&*(),.?":{}|<>;']/.test(value)) {
            errors.push("Password must be contain at least one special character")
        }

        if(errors.length > 0) {
            return helpers.error("any.custom" , { message : errors })
        }

        return value;
    })
    .messages({
        "string.empty" : "Password is required",
        "any.required" : "Password must be required",
        "any.custom" : "{{#messages}}"
    }),
})

module.exports = signupSchema;