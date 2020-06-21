const {Router} = require('express')
const{saveUser , verifyUser ,guestAccess} = require('../controllers/user');



const router = Router();

router.get('/login',guestAccess,(req,res)=>{
    res.render('loginPage')
});

router.post('/login',(req,res)=>{

    verifyUser(req,res)
    
});

router.get('/signup',guestAccess,(req,res)=>{
    res.render('registerPage')
});

router.post('/signup', async (req, res) => {
    saveUser(req, res)

});

module.exports = router