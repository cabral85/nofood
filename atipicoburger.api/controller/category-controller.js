'use strict'

const repository = require('../repository/category-repository');
const _repo = new repository();
const base = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function categoryController() {

}

categoryController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.title, 'o título é obrigatório');
    _validationContract.isRequired(req.body.photo, 'A photo é obrigatória');

    base.post(_repo, _validationContract, req, res);
};

categoryController.prototype.put = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.title, 'o título é obrigatório');
    _validationContract.isRequired(req.body.photo, 'A photo é obrigatória');
    _validationContract.isRequired(req.params.id, 'O Id que será atualizado é obrigatório');

    base.put(_repo, _validationContract, req, res);
};

categoryController.prototype.get = async (req, res) => {
    base.get(_repo, req, res);
};

categoryController.prototype.getById = async (req, res) => {
    base.getById(_repo, req, res);
};

categoryController.prototype.delete = async (req, res) => {
    base.delete(_repo, req, res);
};

module.exports = categoryController;