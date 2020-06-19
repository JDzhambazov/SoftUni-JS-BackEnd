const {DB_PASSWORD} =require('../dbPass')

module.exports = {
    development: {
        port: process.env.PORT || 3000 ,
        databaseUrl:`mongodb+srv://JUser:${DB_PASSWORD}@jtests-1kakw.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};