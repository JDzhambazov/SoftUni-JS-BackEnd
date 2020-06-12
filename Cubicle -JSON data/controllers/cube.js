const cubeModels = require('../models/cubemodel');

function index(req,res,next) {
    cubeModels.getAll().then( cubes =>{
        res.render('index.hbs',{cubes})
    }).catch(next);
}

function details(req,res,next) {
    const id = +req.params.id
    cubeModels.getCurent(id).then( cube =>{
        res.render('details.hbs',{cube})
    }).catch(next);
}

function about(req,res) {
        res.render('about.hbs')
}

function error(req,res) {
    res.render('404.hbs')
}

function getCreate(req,res) {

    res.render('create.hbs')
}

function postCreate(req,res) {
    const {name = null , description = null , imageUrl = null , difLevel = null } =  req.body;
    //имената на променливите са същите както на полетата на формата и ги взимаме от бодито
    const newCube = cubeModels.create(name,description,imageUrl,difLevel);
    cubeModels.insert(newCube).then(() =>{
        res.redirect('/');
    })
}

module.exports={
    index,
    details,
    error,
    about,
    getCreate,
    postCreate

}