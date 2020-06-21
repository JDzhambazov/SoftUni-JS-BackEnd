const {Router} = require('express')
const {getAllCubes , getCube , updateCube} = require('../controllers/cube')
const Accessory = require('../models/accessories')
const { getAllAccessory } = require('../controllers/accessory')
const {authAccess,getUserStatus} = require('../controllers/user')

const router = Router()

router.get('/',getUserStatus, async (req,res)=>{
    const cubes = await getAllCubes()
    //console.log(req.isLoggedIn)
    res.render('index',{
        title:"Cube Workshop",
        cubes,
        isLoggedIn:req.isLoggedIn
    })
});

router.get('/about',getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop',
        isLoggedIn:req.isLoggedIn
    })
});

router.get('/create/accessory',authAccess,getUserStatus,(req,res)=>{
    res.render('createAccessory',{
        title: 'Create Accessory | Cube Workshop',
        isLoggedIn:req.isLoggedIn
    })
})

router.post('/create/accessory',async (req,res)=>{
    const {
        name,
        description,
        imageUrl
    } =req.body;

    const accessory = new Accessory({name,description,imageUrl});

    await accessory.save((err)=>{
        if(err){
            console.error(err)
        }
        
        res.redirect('/create/accessory')
    });

   // res.redirect('/create/accessory')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('aid');
    res.redirect('/')
})

router.get('/attach/accessory/:id',authAccess,async (req,res)=>{
const cube = await getCube(req.params.id);
const accessories = await getAllAccessory();

    res.render('attachAccessory',{
        title: 'Attach Accessory | Cube Workshop',
        ...cube,
        accessories
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } =req.body
    await updateCube(req.params.id , accessory);

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router