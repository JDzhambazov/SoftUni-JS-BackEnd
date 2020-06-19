const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path')

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    //app.engine('.hbs', handlebars({extname: '.hbs',defaultLayout: false}));  
    app.engine('.hbs', handlebars({
        extname: '.hbs'
      }))
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(__appPath , 'views'));
    app.use(express.static(path.resolve( __appPath , 'static')));

};