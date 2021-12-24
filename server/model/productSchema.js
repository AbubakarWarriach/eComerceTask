const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    p_name: {
        type: String,
        required: true
    },
    actual_price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number,
        required: true
    },
    catagari: {
        type: String,
        required: true
    },
});

module.exports.Product = new mongoose.model("product", productSchema);