const Category = require("../models/Category");
const Product = require("../models/Product");

const { unlinkSingleFile } = require("../../src/helpers/unlink.helper");

const CURRENT_PAGE = 1;
const CURRENT_LIMIT = 6;

class ProductController {

  async addProduct(req, res) {
    const {
      name,
      memory,
      salePercent,
      screenSize,
      price,
      description,
      amount,
      color,
      categoryId,
    } = req.body;

    if (!(await Category.findById(categoryId))) {
      unlinkSingleFile(req.file.path);
      return res.status(400).json({ message: "Category is not exist." });
    }

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
    });

    newProduct.save();

    res.status(200).json({ message: "Created successfully." });
  }

  async productList(req, res) {
    let { page, limit, categoryId } = req.query;

    if (!Number.isInteger(Number(page))) {
      page = CURRENT_PAGE;
    }

    if (!Number.isInteger(Number(limit))) {
      limit = CURRENT_LIMIT;
    }

    // filter by categoryId when it have value
    const productList = await Product.find({
      categoryId: categoryId ? categoryId : { $ne: categoryId },
    })
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);

    const productCount = await Product.find({
      categoryId: categoryId ? categoryId : { $ne: categoryId },
    }).count();

    const totalPages =
      productCount % limit == 0
        ? productCount / limit
        : (productCount - (productCount % limit)) / limit + 1;

    res.status(200).json({
      productList,
      page,
      perPage: limit,
      totalPages,
      totalItems: productCount,
    });
  }

  async updateProduct(req, res) {

    const newProduct = req.file
      ? { ...req.body, avatar: req.file.filename }
      : req.body;

    // check category and unlink file upload if not exist
    if (!(await Category.findById(newProduct.categoryId))) {
      unlinkSingleFile(req.file.path);
      return res
        .status(400)
        .json({ message: "categoryId field is not exist." });
    }

    const updateResponse = await Product.updateOne(
      { _id: req.params.productId },
      newProduct
    );

    // unlink file upload if don't have record update
    if (updateResponse.modifiedCount == 0 && req.file) {
      unlinkSingleFile(req.file.path);
    }

    res
      .status(200)
      .json({ message: `Updated ${updateResponse.modifiedCount} record` });
  }

  async deleteProduct(req, res) {

    const deleteResponse = await Product.deleteOne({ _id: req.params.productId });

    res.status(200).json({ message: `Deleted ${deleteResponse.deletedCount} record.` });

  }

  async productDetail(req, res) {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(200).json({ product });
  }

}

module.exports = new ProductController;
