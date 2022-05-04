const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    memory: { type: Number, required: true },
    salePercent: { type: Number, default: 0 },
    screenSize: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    categoryId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', Product);
