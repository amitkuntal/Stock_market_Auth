const bcrypt = require('bcrypt');
const client = require('./../../db/db.js')

function register(data)
{
    return convertPassword(data["password"])
    .then((hash)=>{
        data["password"]=hash
        return insertData(data)
    }).catch((err)=>console.log(err))

}
function convertPassword(password){
    return bcrypt.hash(password,10)
}
function insertData(data){
    query =  `insert into userinfo(email,username,password,sex)\
    values('${data["email"]}','${data["username"]}','${data["password"]}','${data["sex"]}')`
    return client.query(query)
}
module.exports = {register}