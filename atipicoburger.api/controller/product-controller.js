'use strict'

const repository = require('../repository/product-repository');
const _repo = new repository();
const base = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function productController() {

}

productController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.name, 'O nome do produto é obrigatorio');
    _validationContract.isRequired(req.body.description, 'A descrição do produto é obrigatoria');
    _validationContract.isRequired(req.body.photo, 'A foto do produto é obrigatoria');
    _validationContract.isRequired(req.body.price, 'O preço do produto é obrigatorio');
    _validationContract.isRequired(req.body.categoryId, 'Informe a categoria que o produto está');

    if (req.body.price)
        _validationContract.isTrue(req.body.price == 0, 'O preço do produto deve ser maior que Zero.');

    base.post(_repo, _validationContract, req, res);
};

productController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.name, 'O nome do produto é obrigatorio');
    _validationContract.isRequired(req.body.description, 'A descrição do produto é obrigatoria');
    _validationContract.isRequired(req.body.photo, 'A foto do produto é obrigatoria');
    _validationContract.isRequired(req.body.price, 'O preço do produto é obrigatorio');
    _validationContract.isRequired(req.body.categoryId, 'Informe a categoria que o produto está');

    if (req.body.price)
        _validationContract.isTrue(req.body.price == 0, 'O preço do produto deve ser maior que Zero.');

    base.put(_repo, _validationContract, req, res);
};

productController.prototype.get = async (req, res) => {
    base.get(_repo, req, res);
};

productController.prototype.getById = async (req, res) => {
    base.getById(_repo, req, res);
};
productController.prototype.getByCategoryId = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await _repo.getByCategoryId(req.params.id);
            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'Informe o id da categoria',
                validation: {}
            })
        }
    } catch (error) {
        console.log('get com error, motivo: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });
    }
}

productController.prototype.delete = async (req, res) => {
    base.delete(_repo, req, res);
};

module.exports = productController;