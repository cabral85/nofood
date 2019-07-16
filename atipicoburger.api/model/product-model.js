'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productModel = new schema({
    name: { type: String, required: true, trim: true, index : true},
    description: { type: String, required: true},
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    active: { type: Boolean, required: true },
    createDate: { type: Date, default: Date.now }
}, {versionKey : false});

productModel.pre('save', next => {
    let dateNow = new Date();
    if(!this.createDate)
        this.createDate = dateNow;
    next();
});

module.exports = mongoose.model('Product', productModel);