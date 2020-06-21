const {Router} = require('express')
const jwt = require('jsonwebtoken');
const {privateKey} = require('../secretConfig')
const Cube = require('../models/cubemodel')
const {getCube } = require('../controllers/cube');
const {authAccess,getUserStatus} = require('../controllers/user');

const router = Router();

router.get('/create',authAccess, getUserStatus,(req, res) => {
    res.render('create', {
        title: 'Create cubes | Cube Workshop',
        isLoggedIn:req.isLoggedIn
    })
});

router.post('/create',(req,res)=>{
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const token = req.cookies['aid']
    const decodetObject = jwt.verify(token,privateKey)

    const cube = new Cube({name,description,imageUrl,difficulty:difficultyLevel,createrID:decodetObject.userID});

    cube.save((err)=>{
        if(err){
            console.error(err)
            res.redirect('/create')
        }else{
            res.redirect('/')
        }
    })
});

router.get('/details/:id',getUserStatus, async (req,res)=>{
    const cube = await getCube(req.params.id);
    

    res.render('details',{
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn:req.isLoggedIn
    })
})


router.get('/edit/:id',authAccess,getUserStatus ,async (req,res)=>{
    const cube = await getCube(req.params.id);
    //console.log(cube.difficulty)
    res.render('editPage',{
        title: 'Edit | Cube Workshop',
        isLoggedIn:req.isLoggedIn,
        ...cube
    })
});

router.post('/edit/:id', getUserStatus, async (req, res) => {
    // console.log(req.params.id)
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    await Cube.findByIdAndUpdate(req.params.id, { name, description, imageUrl, difficulty: difficultyLevel }, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect('/')
        }
    })

});

router.get('/delete/:id',authAccess, getUserStatus ,async (req,res)=>{
    const cube = await getCube(req.params.id);
    res.render('deletePage',{
        title: 'Delete | Cube Workshop',
        ...cube,
        isLoggedIn:req.isLoggedIn
    })
});

router.post('/delete/:id', getUserStatus,async (req,res)=>{

    await Cube.findByIdAndDelete(req.params.id,(err,doc)=>{
        console.log(doc)
        if(err){
            console.error(err)
            res.redirect('/delete/:id')
        }else{
            console.log('Item deleted ssuccesufull')
            doc.remove()
        }
    });

    res.redirect('/')

});

module.exports = router