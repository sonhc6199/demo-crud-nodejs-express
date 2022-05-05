
const Category = require('../models/Category');
const Product = require('../models/Product');

class CategoryController {

    async addCategory(req, res) {

        const { name } = req.body;

        const newCategory = new Category({
            name
        });

        newCategory.save();

        res.status(200).json({ message: 'Created successfully.' });
    }

    async categoryList(req, res) {
        const categoryList = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ categoryList });
    }

    async updateCategory(req, res) {

        const { name } = req.body;

        const updateResponse = await Category.updateOne({ _id: req.params.categoryId }, { name });
        
        res.status(200).json({ message: `Updated ${updateResponse.modifiedCount} record.` });
    }

    async deleteCategory(req, res) {

        const deleteResponse = await Category.deleteOne({ _id: req.params.categoryId });

        // delete all products has categoryId == req.params.categoryId
        // if (deleteResponse.deletedCount == 1) {
        //     await Product.deleteMany({ categoryId: req.params.categoryId });
        // }

        res.status(200).json({ message: `Deleted ${deleteResponse.deletedCount} record.` });
    }


}

module.exports = new CategoryController