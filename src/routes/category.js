const express = require('express');

const router = express.Router();

const CategoryController = require('../../app/controllers/CategoryController');

const { schemas, validateBody, validateParam } = require('../../app/middlewares/validator.middleware');

router.get('/get-data', CategoryController.categoryList);

router.post('/add', validateBody(schemas.categorySchema), CategoryController.addCategory);

router.put('/edit/:categoryId', validateParam(schemas.idSchema, 'categoryId'), CategoryController.updateCategory);

router.delete('/delete/:categoryId', validateParam(schemas.idSchema, 'categoryId'), CategoryController.deleteCategory);

module.exports = router