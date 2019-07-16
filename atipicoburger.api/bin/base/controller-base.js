'use strict'

exports.post = async (repository, validationContract, req, res) => {
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({message: "Invalid data",
            validation: validationContract.errors()}).end();
        return;
        }

        let result = await repository.create(data);
        res.status(201).send(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Processing error', error: err });
    }
};

exports.put = async (repository, validationContract, req, res) => {
    try{
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({message: "Invalid data",
            validation: validationContract.errors()}).end();
        return;
        }

        let result = await repository.update(req.params.id, data);
        res.status(202).send(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Processing error', error: err });
    }
};

exports.get = async (repository, res) => {
    try{
        let data = await repository.getAll();
        res.status(200).send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Processing error', error: err });
    }
};

exports.getById = async (repository, req, res) => {
    try{
        let id = req.params.id;
        if(id){
            let data = await repository.getById(id);
            res.status(200).send(data);
        }else{
            res.status(400).send({message : 'Invalid ID'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Processing error', error: err });
    }
};

exports.delete = async (repository, req, res) => {
    try{
        let id = req.params.id;
        if(id){
            let data = await repository.delete(id);
            res.status(204).send(data);
        }else{
            res.status(400).send({message: "Invalid ID"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Processing error', error: err });
    }
};