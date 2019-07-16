'use strict'
require('../model/product-model');
const base = require('../bin/base/repository-base');

class productRepository{
    constructor() {
        this._base = new base('Product');
    }

    async create(data){
        return await this._base.create(data);
    }

    async update(id, data){
        return await this._base.update(id, data);
    }

    async getAll(){
        return await this._base.getAll();
    }

    async getById(id){
        return await this._base.getById(id);
    }

    async delete(id){
        return await this._base.delete(id);
    }

    async getByCategoryId(id) {
        return await this._base._model.find({ categoriaId: id });
    }


}

module.exports = productRepository;