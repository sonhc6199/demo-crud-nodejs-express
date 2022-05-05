const Joi = require('@hapi/joi')
const { unlinkSingleFile, unlinkMultipleFiles } = require('../../src/helpers/unlink.helper');

const validateBody = (schema) => {

    return (req, res, next) => {

        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {

            if (req.file) {
                unlinkSingleFile(req.file);
            }

            if (req.files?.length >= 0) {
                unlinkMultipleFiles(req.files);
            }

            return res.status(400).json(validatorResult.error.details[0].message);
        } else {
            next();
        }
    }
}

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ param: req.params[name] })
        if (validatorResult.error) {

            if (req.file) {
                unlinkSingleFile(req.file);
            }

            if (req.files?.length >= 0) {
                unlinkMultipleFiles(req.files);
            }

            return res.status(400).json(validatorResult.error.details[0].message);
        } else {
            next();
        }
    }
}


const schemas = {

    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userSchema: Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(20).required(),
        password: Joi.string().alphanum().min(6).max(20).required(),
    }),

    productSchema: Joi.object().keys({
        name: Joi.string().min(4).max(30).required(),
        memory: Joi.number().valid(32, 64, 128, 256, 512).required(),
        salePercent: Joi.number().min(0).max(90).required(),
        screenSize: Joi.number().required(),
        price: Joi.number().min(100000).required(),
        description: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        color: Joi.string().valid('blue', 'red', 'gold', 'purple', 'white', 'black').required(),
        categoryId: Joi.string().required(),
    }),

    categorySchema: Joi.object().keys({
        name: Joi.string().min(2).required(),
    })


}

module.exports = {
    validateBody,
    validateParam,
    schemas
}