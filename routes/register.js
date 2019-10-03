const api = require("./functions/register.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const joischema = require('./../validate/register.js')
jsonParser = bodyParser.json();

router.post('/',jsonParser,function(req,res,next){
    data = req.body
    const validate = joischema.registerSchema.validate(data)
    if(validate.error){
        res.status(400).send(validate.error.details[0].message)
    }
    else{
        api.register(data).then((data)=>{
            if(data.rowCount == 0){
                res.status(400).send('Something went wrong')
            }
            else{
                res.status(200).send("successfully registered")
            }
        }).catch(next)
    }
    
})
module.exports = router;
