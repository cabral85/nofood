const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables')

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['jwt'];
    if(token){
        try{
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            req.loggedUser = decoded;
            next();
        }
        catch(err){
            res.status(401).send({message: 'Token invalido'});

        }
    }else{
        res.status(401).send({message: 'Token invalido'});
        return;
    }
}