const {Router} = require('express')
const{saveUser , verifyUser ,guestAccess , getUserStatus} = require('../controllers/user');



const router = Router();

router.get('/login',guestAccess,(req,res)=>{
    res.render('loginPage')
});

router.post('/login',(req,res)=>{

    verifyUser(req,res)
    
});

router.get('/signup',guestAccess,getUserStatus,(req,res)=>{

    const error = req.query.error ?'Username or Passwort is not valid':null;

    res.render('registerPage',{
        isLoggedIn:req.isLoggedIn,
        error
    })
});

router.post('/signup', async (req, res) => {
    const {
        password,
        repeatPassword
    } = req.body;

    if (!password || password.lenght < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
        res.redirect('/signup?error=true')
    } else if (password !== repeatPassword) {
        res.redirect('/signup?error=true')
    } else {
        saveUser(req, res)
    }
});

module.exports = router