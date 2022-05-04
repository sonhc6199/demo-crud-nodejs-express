const Joi = require('@hapi/joi')
const { unlink } = require('fs/promises');
const validateBody = (schema) => {

    return (req, res, next) => {

        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            if (req.file) {
                unlink(req.file.path);
            }
            return res.status(400).json(validatorResult.error)
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
                unlink(req.file.path);
            }
            return res.status(400).json(validatorResult.error)
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
    
}

module.exports = {
    validateBody,
    validateParam,
    schemas
}