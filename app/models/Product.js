const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { unlinkSingleFile } = require("../../src/helpers/unlink.helper");
const Product = new Schema(
  {
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    memory: { type: Number, required: true },
    salePercent: { type: Number, default: 0 },
    screenSize: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    color: { type: String, required: true },
    categoryId: { type: String, required: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

Product.pre('save', async function (next) {
  try {
    // generate slug for product and increase if it not unique
    const productModel = mongoose.model("Product", Product);

    let slug = this.name.split(" ").join("-");

    const productCount = await productModel.find({ name: this.name }).count();

    if (productCount > 0) slug += `-${productCount}`;
    this.slug = slug;
    next();
  } catch (err) {
    next(err);
  }
});

Product.pre('updateOne', async function (next) {
  try {
    const productModel = mongoose.model('Product', Product);

    const oldProduct = await productModel.findById(this._conditions._id);

    if (!oldProduct) next();

    // if name changed, update slug and increase slug if it not unique
    if (oldProduct.name != this._update.name) {
      let slug = this._update.name.split(" ").join("-");
      const productCount = await productModel.find({ name: this._update.name }).count();
      if (productCount > 0) slug += `-${productCount}`;
      this._update.slug = slug;
    }

    // delete filePath of old product if avatar have change
    if (this._update.avatar) {

      const filePath = `public/images/${oldProduct.avatar}`;
      unlinkSingleFile(filePath);
    }

    next();
  } catch (err) {
    next(err);
  }
});

Product.pre('deleteOne', async function (next) {
  try {
    // find and delete file path product after it has been deleted
    const productModel = mongoose.model('Product', Product);
    const product = await productModel.findById(this._conditions._id);
    if (!product) next();
    const filePath = `public/images/${product.avatar}`;
    unlinkSingleFile(filePath);
    next();
  }
  catch (err) {
    next(err);
  }
});
module.exports = mongoose.model('Product', Product);
