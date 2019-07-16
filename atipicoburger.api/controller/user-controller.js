'use strict'

const repository = require('../repository/user-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _repo = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

function userController(){
    
}

userController.prototype.post = async (req, res) => { 
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isRequired(req.body.name, 'Informe seu nome');
    _validationContract.isEmail(req.body.email, 'E-mail invalido');
    _validationContract.isRequired(req.body.password, 'Senha obrigatória');
    _validationContract.isRequired(req.body.confirmationPassword, 'Senha de confirmação obrigatória');
    _validationContract.isTrue(req.body.password != req.body.confirmationPassword, 'Senha e confirmação são diferentes');

    let userExists = await _repo.checkIfEmailExists(req.body.email)
    if(userExists){
        _validationContract.isTrue(userExists.name != undefined, 'Email já cadastrado');
    }

    req.body.password = md5(req.body.password);

    controllerBase.post(_repo, _validationContract, req, res);
};

userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isRequired(req.body.name, 'Informe seu nome');
    _validationContract.isEmail(req.body.email, 'E-mail invalido');
    _validationContract.isRequired(req.body.id, 'Obrigatorio informar o ID');

    let userExists = await _repo.checkIfEmailExists(req.body.email)
    if(userExists){
        _validationContract.isTrue((userExists.name != undefined) && (userExists._id != req.param.id), 'Email já cadastrado para outro usuário');
    }

    controllerBase.put(_repo, _validationContract, req, res);
};

userController.prototype.get = async (req, res) => { 
    controllerBase.get(_repo, res);
};

userController.prototype.getById = async (req, res) => { 
    controllerBase.getById(_repo, req, res);
};

userController.prototype.delete = async (req, res) => { 
    controllerBase.delete(_repo, req, res);
};

userController.prototype.auth = async (req, res) =>{
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'E-mail invalido');
    _validationContract.isRequired(req.body.password, 'Senha obrigatória');
    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Valide os campos digitados e tente novamente', validation: _validationContract.errors() });
        return;
    }
    let findedUser = await _repo.authenticate(req.body.email, req.body.password);
    if(findedUser){
        res.status(200).send({
            loggedUser: findedUser,
            token: jwt.sign({user: findedUser}, variables.Security.secretKey)
        })
    }
    else{
        res.status(404).send({message: 'Usuario / Senha invalido'});
    }
}

module.exports = userController;