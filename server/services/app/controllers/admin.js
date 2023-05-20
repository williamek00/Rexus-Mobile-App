const {User , Category , Image , Product , sequelize} = require('../models/index')
const { compareHash } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const slugify = require('slugify')
class Controller {
    static async login(req,res,next) {
        const { email, password } = req.body
        try {
            if (!email)  throw { name: "InvalidEmail" }
            if (!password) throw { name: "InvalidPassword" }

            const newUser = await User.findOne({ where: { email } })
            // console.log(newUser);
            if (!newUser)  throw { name: "Email or password is wrong!" }
            
            const isCorrect = compareHash(password, newUser.password)
            
            if (!isCorrect)  throw { name: "Email or password is wrong!" }

            const token = encodeToken({ id: newUser.id })
          
            res.json({
                access_token: token,
                email: newUser.email,
            })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async register(req, res, next) { 
        const { username,email, password,phoneNumber,address} = req.body
        try {
            if (!username) throw { name: "InvalidUsername" }
            if (!email)  throw { name: "InvalidEmail" }
            if (!password) throw { name: "InvalidPassword" }
            if (!phoneNumber) throw { name: "InvalidPhoneNumber" }
            if (!address) throw { name: "InvalidAddress" }

            const newRegister = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address
            })

            res.status(201).json({ message: `User with this ${newRegister.email} has been created` })

        } catch (error) {
            console.log(error,"error")
            next(error)
        }
    }

    static async fetchProducts(req,res,next) {
        try {
            const product = await Product.findAll({
                include:[{
                    model:User,
                    attributes: ["email"]
                },
                {
                    model:Category
                },
                {
                    model:Image
                }
            ]
            })
            if(!product) throw { name : "Not Found"}
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async fetchWebcam(req, res, next) {
        try {
          const product = await Product.findAll(
            { where: { categoryId: 3 },
                
                include: [
                    {
                    model: User,
                    attributes: ["email"],
                    },
                    {
                    model: Category,
                    },
                    {
                    model: Image,
                    },
                ],
            }
          );
          if (!product) throw { name: "Not Found" };
          res.status(200).json(product);
        } catch (error) {
          next(error);
        }
    }

    static async fetchKeyboard(req, res, next) {
        try {
          const product = await Product.findAll(
            { where: { categoryId: 2 },
                
                include: [
                    {
                    model: User,
                    attributes: ["email"],
                    },
                    {
                    model: Category,
                    },
                    {
                    model: Image,
                    },
                ],
            }
          );
          if (!product) throw { name: "Not Found" };
          res.status(200).json(product);
        } catch (error) {
          next(error);
        }
    }

    static async fetchHeadset(req, res, next) {
        try {
          const product = await Product.findAll(
            { where: { categoryId: 1 },
                
                include: [
                    {
                    model: User,
                    attributes: ["email"],
                    },
                    {
                    model: Category,
                    },
                    {
                    model: Image,
                    },
                ],
            }
          );
          if (!product) throw { name: "Not Found" };
          res.status(200).json(product);
        } catch (error) {
          next(error);
        }
    }

    static async addProducts(req,res,next) {
        try {
            const { name, description, mainImg, price, categoryId, image1, image2 } = req.body;
            // console.log(name);
            // if(!name || !description || !mainImg ||!price ||!categoryId) throw { name : "Fields is required"}
            const result = await sequelize.transaction(async (t) => {
                let slug = slugify(name).toLowerCase(name)
                // console.log(slug,"<<<<SLUG");
             const newProduct = await Product.create(

                {
                    name,
                    slug,
                    description,
                    price,
                    mainImg,
                    categoryId,
                    authorId : 1,
                },
                { 
                    transaction: t
                }
            );
            let add = [{ imgUrl: image1 }, { imgUrl: image2 }];
            const imageObj = add.map((el) => {
                return {
                    imgUrl: el.imgUrl,
                    productId: newProduct.id
                };
            })

            await Image.bulkCreate(imageObj, { transaction: t });

            return newProduct;
        });

        res.status(201).json({
            data: result,
        });
        } catch (error) {
            next(error)
        }
    }

    static async deleteProducts(req,res,next){
        try {
            const { id } = req.params
            const find = await Product.findByPk(id)
            if(!find) throw {name : 'Not Found'}

            await Product.destroy({where : {id}})
            res.status(200).json({message:`Product with ${id} has been deleted`})
        } catch (error) {
            next(error)
        }
    }

    static async updateProducts(req,res,next){
        try {
            const {id} =  req.params
            const {name , description , price , mainImg , categoryId } = req.body
            if(!name||!description||!price||!mainImg||!categoryId) throw new Errors(400 , "Fields must filled")

            let slug = slugify(name).toLowerCase(name)
            const product = await Product.update({name ,slug, description , price , mainImg , categoryId },{where: {id}})
            res.status(201).json({message:`Product with ${id} updated`})
        } catch (error) {
            next(error)
        }
    }
    
    static async fetchCategories(req,res,next) {
        try {
            const category = await Category.findAll()
            if(!category) throw { name : "Not Found"}
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async addCategories(req,res,next) {
        try {
        const {name } = req.body

        if(!name) throw new Errors(400 , "Fields must filled")
        
        const category = await Category.create({name})
        
        res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategories(req,res,next){
        try {
            const { id } = req.params
            const find = await Category.findByPk(id)
            if(!find) throw {name : 'Not Found'}

            await Category.destroy({where : {id}})
            res.status(200).json({message:`Category with ${id} has been deleted`})
        } catch (error) {
            next(error)
        }
    }

    static async updateNameCategories(req,res,next){
        try {
        const { id } = req.params
        const { name } = req.body
        if(!name) throw new Error(400, "Name must be filled")

        const category = await Category.update({name},{where:{id}})
        res.status(201).json({message:`Category with ${id} updated`})
        } catch (error) {
            next(error)
        }
        
    }
    
    static async fetchCategoryById(req, res, next) {
        try {
          const { id } = req.params;
          const category = await Category.findByPk(id);
          if (!category) throw { name: "Not Found" };
          res.status(200).json(category);
        } catch (error) {
          next(error);
        }
    }

    static async fetchProductById(req, res, next) {
        try {
          const { id } = req.params;
          const product = await Product.findByPk(id);
          if (!product) throw { name: "Not Found" };
          res.status(200).json(product);
        } catch (error) {
          next(error);
        }
    }

}

module.exports= Controller