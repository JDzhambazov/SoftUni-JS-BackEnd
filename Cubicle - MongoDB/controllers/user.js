const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../secretConfig');

const generateToken = data => {
    const token = jwt.sign(data, privateKey)
  
    return token
  }

const saveUser =(req,res)=>{
    const{
        username,
        password,
        repeatPassword
    } =req.body;

    if(password !== repeatPassword){
        res.redirect('/signup')
    } else{
        bcrypt.genSalt(10,async (err,salt)=>{
            const hashPass =await bcrypt.hash(password,salt)
            const user = new User({
                username , 
                password:hashPass
            })
            const newUser = await user.save();

            const token = jwt.sign({
                userID: newUser._id,
                usernamme: newUser.usernamme
            }, privateKey);
            
            res.cookie('aid',token)
            
            res.redirect('/')
        });
    };
};

const verifyUser = async (req,res) => {
    const{
        username,
        password,
    } =req.body;

    const user = await User.findOne({username})
   
    const status =await bcrypt.compare(password,user.password);
    
    if (status) {
        const token = generateToken({ 
          userID: user._id,
          username: user.username
        })
      
        res.cookie('aid',token)
        res.redirect('/')
      }else{
          res.redirect('/login')
      }
    
    return status;
}

const authAccess = (req, res, next) => {
    const token = req.cookies['aid']
    if (!token) {
      return res.redirect('/')
    }
    
    try {
      jwt.verify(token, privateKey)
      next()
    } catch(e) {
      return res.redirect('/')
    }
  }

  const authAccessJSON = (req, res, next) => {
    const token = req.cookies['aid']
    if (!token) {
      return res.json({
        error: "Not authenticated"
      })
    }
    
    try {
      jwt.verify(token, privateKey)
      next()
    } catch(e) {
      return res.json({
        error: "Not authenticated"
      })
    }
  }
  
  const guestAccess = (req, res, next) => {
    const token = req.cookies['aid']
    if (token) {
      return res.redirect('/')
    }
    next()
  }
  
  const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid']
    if (!token) {
      req.isLoggedIn = false
    }
    
    try {
      jwt.verify(token, privateKey)
      req.isLoggedIn = true
    } catch(e) {
      req.isLoggedIn = false
    }
  
    next()
  }

module.exports ={
    saveUser,
    verifyUser,
    authAccess,
    guestAccess,
    getUserStatus,
    authAccessJSON
}