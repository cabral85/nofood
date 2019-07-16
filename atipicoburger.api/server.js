'use scrict'
const app = require('./bin/express');
const variables = require('./bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.log(`Api inicializada na porta: ${variables.Api.port}`)
});