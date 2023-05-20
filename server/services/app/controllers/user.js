const { User, Category, Image, Product } = require("../models/index");

class Controller {
  static async fetchProduct(req, res, next) {
    try {
      const product = await Product.findAll({
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
      });
      if (!product) throw { name: "Not Found" };
      res.status(200).json(product);
    } catch (error) {
      next(error);
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

  static async fetchProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
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
      });
      if (!product) throw { name: "Not Found" };
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
