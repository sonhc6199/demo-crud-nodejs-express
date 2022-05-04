const express = require('express');

const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

const { schemas, validateBody, validateParam } = require('../../app/middlewares/validator.middleware');

const { singleUpload, multipleUpload } = require('../../app/middlewares/file.middleware');

router.post('/', singleUpload, validateBody(schemas.productScheme), ProductController.addProduct);

module.exports = router