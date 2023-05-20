module.exports = (error, req, res, next) => {
    let status, message
    console.log(error, "erorHandler")
    switch (error.name) {
        case "SequelizeValidationError":
            status = 400
            message = error.errors[0].message
            break;

        case "SequelizeUniqueConstraintError":
            status = 400
            message = "Email already use! change your email"
            break;

        case "JsonWebTokenError":
            status = 401
            message = "Token Is Invalid"
            break;

        case "notFound":
            status = 404
            message = "Error Not Found"
            break;

        case "Not Found":
            status = 404
            message = "Error Not Found"
            break;
        case 'Favourite has been removed':
            status = 404
            message = 'Favourite is not found'
            break;
        case 'Favourite already exists':
            status = 400
            message = 'Favourite already exists'
            break;

        case "InvalidEmail":
            status = 400
            message = "Email Invalid"
            break;
        case "Fields is required":
            status = 400
            message = "Fields is required"
            break;
        case "InvalidEmail":
            status = 400
            message = "Email Invalid"
            break;

        case "InvalidPassword":
            status = 400
            message = "Password Invalid"
            break;

        case "Email or password is wrong!":
            status = 401
            message = "Email or password is wrong!"
            break;

        case "tokenIsInvalid":
        case "AccessTokenMissing":
            status = 401
            message = "Token is Invalid"
            break;
        case "Cannot access":
            status = 403
            message = "Cannot Access"
            break;

        case "Favourite already exists":
            status = 400
            message = "Favourite already exists"
            break;


        default:
            status = 500
            message = "Internal Server Error"
            break;
    }
    res.status(status).json( {message} )
}