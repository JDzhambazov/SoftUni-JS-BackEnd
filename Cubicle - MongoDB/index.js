const env = process.env.NODE_ENV || 'development';
global.__appPath = __dirname;
const mongoose = require('mongoose')

const config = require('./config/config')[env];
const app = require('express')();
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const cubeRouter = require('./routes/cube')
const cubeModel = require('./models/cubemodel');
const {getUserStatus} = require('./controllers/user')


const dbPath = config.databaseUrl;
//const dbPath ='mongodb://localhost:27017/cubicle';


mongoose.connect( dbPath  ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err)=>{
    if(err){
        console.error(err);
        throw err;
    }

    console.log('Database is runing')
})

require('./config/express')(app);
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', cubeRouter);


app.get('*',getUserStatus, (req, res) => {
    res.render('404', {
        title: 'Error | Cube Workshop',
        isLoggedIn:req.isLoggedIn
    })
})


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));