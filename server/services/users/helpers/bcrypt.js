const bcrypt = require("bcryptjs")

const hashedPassword = (password) => {
    return bcrypt.hashSync(password , 8)
}

const compareHash = (password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword)
}

module.exports = { hashedPassword , compareHash }