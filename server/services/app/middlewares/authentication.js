const { decodeToken } = require("../helpers/jwt")
const { User } = require("../models/index")

async function authentication(req,res,next){
    
    try {
        let { access_token } = req.headers
 
        if(!access_token)  throw ({name:"AccessTokenMissing"})

        let payload = decodeToken(access_token)
    
        let user = await User.findByPk(payload.id)

        if(!user) throw ({name:"tokenIsInvalid"})
            
        req.user = {
            id:user.id,
            email:user.email,
            role:user.role
        }

        next()

    } catch (error) {
        next(error)
        
    }
}
module.exports = authentication