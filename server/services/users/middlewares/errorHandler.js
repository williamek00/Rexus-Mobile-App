module.exports = (error, req, res, next) => {
    let status, message
    console.log(error, "erorHandler")
    switch (error.name) {
        // case "JsonWebTokenError":
        //     status = 401
        //     message = "Token Is Invalid"
        //     break;

        case "Not Found":
            status = 404
            message = "Error Not Found"
            break;
       
        case "Fields is required":
            status = 400
            message = "Fields is required"
            break;
        // case "InvalidEmail":
        //     status = 400
        //     message = "Email Invalid"
        //     break;

        // case "InvalidPassword":
        //     status = 400
        //     message = "Password Invalid"
        //     break;

        // case "Email or password is wrong!":
        //     status = 401
        //     message = "Email or password is wrong!"
        //     break;

        // case "tokenIsInvalid":
        // case "AccessTokenMissing":
        //     status = 401
        //     message = "Token is Invalid"
        //     break;
        // case "Cannot access":
        //     status = 403
        //     message = "Cannot Access"
        //     break;

        // case "Favourite already exists":
        //     status = 400
        //     message = "Favourite already exists"
        //     break;


        default:
            status = 500
            message = "Internal Server Error"
            break;
    }
    res.status(status).json( {message} )
}