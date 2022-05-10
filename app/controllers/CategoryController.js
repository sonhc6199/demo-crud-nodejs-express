
const Category = require('../models/Category');

const CURRENT_PAGE = 1;
const CURRENT_LIMIT = 10;

class CategoryController {

    async addCategory(req, res) {

        const { name } = req.body;

        const newCategory = new Category({
            name
        });

        newCategory.save();

        res.status(200).json({ newCategory });
    }

    async categoryList(req, res) {
        let { page, limit } = req.query;

        if (!Number.isInteger(Number(page))) {
            page = CURRENT_PAGE;
        }

        if (!Number.isInteger(Number(limit))) {
            limit = CURRENT_LIMIT;
        }

        const categoryList = await Category.find().sort({ createdAt: -1 })
            .skip(limit * (page - 1))
            .limit(limit);

        const categoryCount = await Category.count();

        const totalPages =
            categoryCount % limit == 0
                ? categoryCount / limit
                : (categoryCount - (categoryCount % limit)) / limit + 1;

        res.status(200).json({
            categoryList,
            page: Number(page),
            perPage: Number(limit),
            totalPages,
            totalItems: categoryCount,
        });

    }

    async updateCategory(req, res) {

        const { name } = req.body;

        await Category.updateOne({ _id: req.params.categoryId }, { name });

        const newCategory = await Category.findById({ _id: req.params.categoryId });

        res.status(200).json({ newCategory });
    }

    async deleteCategory(req, res) {

        const deleteResponse = await Category.deleteOne({ _id: req.params.categoryId });

        res.status(200).json({ message: `Deleted ${deleteResponse.deletedCount} record.` });
    }


}

module.exports = new CategoryController