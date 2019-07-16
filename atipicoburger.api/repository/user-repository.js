'use strict'
require('../model/user-model');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

class userRepository{
    constructor() {
        this._base = new base('User');
        this._projection = 'name email _id';
    }

    async authenticate(inEmail, inPassword){
        let hashPassword = md5(inPassword);
        return await this._base._model.findOne({email: inEmail, password: hashPassword}, this._projection);
    }

    async checkIfEmailExists(isEmail){
        return await this._base._model.findOne({email:inEmail}, this._projection);
    }

    async create(data){
        let createdUser = await this._base.create(data);
        return await this._base._model.findById(createUser._id, this._projection);
    }

    async update(id, data){
        let updatedUser = await this._base.update(id, {
            name: data.name,
            email: data.email
        });
        return await this._base._model.findById(updatedUser._id, this._projection);
    }

    async getAll(){
        return await this._base._model.find({}, this._projection);
    }

    async getById(id){
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id){
        return await this._base.delete(id);
    }


}

module.exports = userRepository;