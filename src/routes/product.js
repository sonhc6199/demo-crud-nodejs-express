const express = require('express');

const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

const { schemas, validateBody, validateParam } = require('../../app/middlewares/validator.middleware');

const { singleUpload } = require('../../app/middlewares/file.middleware');

router.get('/', ProductController.productList);

router.get('/:slug', ProductController.productDetail);

router.post('/', singleUpload, validateBody(schemas.productSchema), ProductController.addProduct);

router.put('/:productId', singleUpload, validateBody(schemas.productSchema), ProductController.updateProduct);

router.delete('/:productId', ProductController.deleteProduct);

module.exports = router