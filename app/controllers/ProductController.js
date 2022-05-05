
const Category = require('../models/Category');
const Product = require('../models/Product');

const { unlinkSingleFile } = require('../../src/helpers/unlink.helper');

const { unlink } = require('fs/promises');

const CURRENT_PAGE = 1;
const CURRENT_LIMIT = 6;

class ProductController {

    async addProduct(req, res) {

        const { name, memory, salePercent, screenSize, price, description, amount, color, categoryId } = req.body;

        const category = await Category.findById(categoryId);

        if (!category) {
            unlinkSingleFile(req.file);
            return res.json({ message: 'Category is not exist.' });
        }

        let slug = name.split(' ').join('-');

        const productCount = await Product.find({ name }).count();

        if (productCount > 0) slug += `-${productCount}`;

        const newProduct = new Product({
            avatar: req.file.filename,
            name,
            memory,
            salePercent,
            screenSize,
            price,
            description,
            amount,
            categoryId,
            color,
            slug
        });

        newProduct.save();

        res.status(200).json({ message: 'Created successfully.' });


    }

    async productList(req, res) {

        let { page, limit, categoryId } = req.query;

        if (!Number.isInteger(Number(page))) {
            page = CURRENT_PAGE;
        }

        if (!Number.isInteger(Number(limit))) {
            limit = CURRENT_LIMIT;
        }

        const productList = await Product.find({ categoryId: categoryId ? categoryId : { $ne: categoryId } }).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit);

        const productCount = await Product.count();

        const totalPages = productCount % limit == 0 ? productCount / limit : (productCount - productCount % limit) / limit + 1;

        res.status(200).json({ productList, page, perPage: limit, totalPages, totalItems: productCount });
    }

    async updateProduct(req, res) {

        const { name, memory, salePercent, screenSize, price, description, amount, color, categoryId } = req.body;

        const product = await Product.findById(req.params.productId);
        
        const category = await Category.findById(categoryId);


        if (!category) {
            unlinkSingleFile(req.file);
            return res.json({ message: 'Category is not exist.' });
        }

        let slug = name.split(' ').join('-');

        const productCount = await Product.find({ name }).count();

        if (productCount > 0) slug += `-${productCount}`;

        if (req.file) {
            const filePath = `public/images/${product.avatar}`;

            unlink(filePath);
        }


    }

    async deleteProduct(req, res) {

        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(200).json({ message: `Deleted 0 record.` });
        }

        const filePath = `public/images/${product.avatar}`;

        unlink(filePath);

        await Product.deleteOne({ _id: req.params.productId });

        res.status(200).json({ message: `Deleted 1 record.` });
    }

    async productDetail(req, res) {
        const product = await Product.findOne({ slug: req.params.slug });
        res.status(200).json({ product });
    }

}

module.exports = new ProductController