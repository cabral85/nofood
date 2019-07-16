const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routers
const categoryRouter = require('../routes/category-router');
const productRouter = require('../routes/product-router');
const userRouter = require('../routes/user-router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//DB Configuration
mongoose.connect('mongodb+srv://atipico_user:a1s2d3a1@atipico-burger-5ittv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true } )

//Route config
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

module.exports = app;