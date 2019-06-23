const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:32775/users', {useNewUrlParser: true});

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

module.exports = app;