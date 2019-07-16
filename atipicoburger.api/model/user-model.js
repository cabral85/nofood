'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = new schema({
    name: { type: String, required: true, trim: true, index : true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    createDate: { type: Date, default: Date.now }
}, {versionKey : false});

userModel.pre('save', next => {
    let dateNow = new Date();
    if(!this.createDate)
        this.createDate = dateNow;
    next();
});

module.exports = mongoose.model('User', userModel);