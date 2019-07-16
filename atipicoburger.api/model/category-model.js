'use strict'

const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const categoryModel = new schema({
    title: {trim: true, index: true, required: true, type: String},
    description: { type: String },
    active: { type: Boolean, required: true },
    photo: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
}, { versionKey: false });

categoryModel.pre('save', next => {
    let dateNow = new Date();
    if(!this.createDate)
        this.createDate = dateNow;
    next();
})

module.exports = mongoose.model('Category', categoryModel);