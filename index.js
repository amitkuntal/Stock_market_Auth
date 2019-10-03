const express = require('express');
const app = express();
const login = require('./routes/login.js')
const register = require('./routes/register.js')
const client = require('./db/db.js')
const logger = require('./logger/logger.js')
const port = process.env.port || 3000;

client.connect().catch((err)=> {
   logger.error(err.message)
   process.exit()   
})

app.use(function(req,res,next){
   logger.info(req.url)
   next()
})

app.use('/login',login)
app.use('/register',register)

app.use(function(err,res){
   logger.error(err.message)
   res.status(500).send("Internal Server Error")
})

app.listen(port);