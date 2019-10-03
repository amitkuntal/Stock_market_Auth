const api = require("./functions/login.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
jsonParser = bodyParser.json();
const joiSchema = require('./../validate/login.js')
  

router.post('/',jsonParser,function(req,res,next){
    data = req.body
    const validate = joiSchema.loginSchema.validate(data)
    if(validate.error)
    {
        res.status(400).send(validate.error.details[0].message)
    }
    else{
        api.login(data).then((result)=>res.status(result.status).send(result.msg)).catch(next)
    }
   
})

module.exports = router;
