const express = require('express');

const router = express.Router();

const CategoryController = require('../../app/controllers/CategoryController');

const { schemas, validateBody, validateParam } = require('../../app/middlewares/validator.middleware');

router.get('/', CategoryController.categoryList);

router.post('/', validateBody(schemas.categorySchema), CategoryController.addCategory);

router.put('/:categoryId', validateParam(schemas.idSchema, 'categoryId'), CategoryController.updateCategory);

router.delete('/:categoryId', validateParam(schemas.idSchema, 'categoryId'), CategoryController.deleteCategory);

module.exports = router