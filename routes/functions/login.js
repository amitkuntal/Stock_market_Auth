const bcrypt = require('bcrypt');
const client = require('./../../db/db.js')
const jwt = require('jsonwebtoken');
  

function queryExecutor(query)
{
    return client.query(query)
}

function login(userdata){
    dbUserData=''
    result={}
    query = `select * from userinfo where email='${userdata["email"]}'`
    return queryExecutor(query).then((data)=>{
        if(data.rowCount==0){
            result["status"]=400
            result["msg"]="User Name does not exist" 
            return result
        }
        else{
            dbUserData=data.rows
            return dbUserData
        }
    }).then((dbUserData)=>
    {
       return bcrypt.compare(userdata["password"], dbUserData[0]["password"])
    }).then((res)=>{
        if(res==true)
        {
        msg = {"email":dbUserData[0]["email"],
            "username":dbUserData[0]["username"],
            "sex":dbUserData[0]["sex"]
        }
        token = jwt.sign(msg,process.env.KEY,{'expiresIn':'1h'})
        msg["token"]=token
        result["status"]=200
        result["msg"]=msg
        console.log(result)
        return result
        }
        else{
            result["status"]=400
            result["msg"]="User Name does not exist"
            return result
        }

    })

}
module.exports = {login}