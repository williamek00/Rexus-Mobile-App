const { default: slugify } = require("slugify")

module.exports = function slug(name){
return slugify(name)
}