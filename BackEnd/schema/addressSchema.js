const Joi = require('joi');

const addressSchema = Joi.object({
    city: Joi.string().min(1).max(30).required().messages({
        'string.base' : 'city must be a text',
        'string.empty' : 'city must be required',
        'any.required' : 'city is required'
    }),
    landmark: Joi.string().min(1).max(30).required().messages({
        'string.base' : 'landmark must be a text',
        'string.empty' : 'landmark must be required',
        'any.required' : 'landmark is required'
    }),
    district: Joi.string().min(1).max(30).required().messages({
        'string.base' : 'district must be a text',
        'string.empty' : 'district must be required',
        'any.required' : 'district is required'
    }),
    state: Joi.string().min(1).max(30).required().messages({
        'string.base' : 'state must be a text',
        'string.empty' : 'state must be required',
        'any.required' : 'state is required'
    }),
    pincode: Joi.string().min(4).max(6).required().messages({
        'string.empty' : 'pincode must be required',
        'any.required' : 'pincode is required'
    }),
})

module.exports = addressSchema;