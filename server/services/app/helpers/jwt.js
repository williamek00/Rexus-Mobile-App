require("dotenv").config()
const jwt = require("jsonwebtoken")
const secret_key = process.env.secret_key

const encodeToken = (payload)=>{
    return jwt.sign(payload,"aingjawaradidie6969")
}
const decodeToken = (token)=>{
    return jwt.verify(token,"aingjawaradidie6969")
}

module.exports={
    encodeToken,
    decodeToken
}