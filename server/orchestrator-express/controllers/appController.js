const appsURL = "http://localhost:4002";
const axios = require("axios");
const slugify = require("slugify");
const redis = require("../config/redis");

class Controller {
  static async getAllKeyboard(req, res) {
    try {
      const keyboardCache = await redis.get("app:product");

      if (keyboardCache) {
        const data = JSON.parse(keyboardCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appsURL}/admin/keyboard`);
        await redis.set("app:product", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllHeadset(req, res) {
    try {
      const headsetCache = await redis.get("app:product");

      if (headsetCache) {
        const data = JSON.parse(headsetCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appsURL}/admin/headset`);
        await redis.set("app:product", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllWebcam(req, res) {
    try {
      const webcamCache = await redis.get("app:product");

      if (webcamCache) {
        const data = JSON.parse(webcamCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appsURL}/admin/webcam`);
        await redis.set("app:product", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createNewProduct(req, res, next) {
    try {
      const { data } = await axios.post(`${process.env.BASE_URL_PRODUCT}/admin/newproduct`, {
          ...req.body,
      })
      await redis.del("products");
      res.status(200).json(data)
  } catch (error) {
      res.status(error.response.status).json({ msg: error.response.data.message });
  }
  }

  static async deleteProducts(req, res, next) {
    try {
      const { data } = await axios.delete(
        `${appsURL}/admin/deleteproduct/${req.params.id}`
      );
      await redis.del("user:users");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { name, description, price, mainImg, categoryId } = req.body;
      if (!name || !description || !price || !mainImg || !categoryId)
        throw new Errors(400, "Fields must filled");

      let slug = slugify(name).toLowerCase(name);

      const response = await axios({
        method: "put",
        url: `${appsURL}/admin/updateproduct/${req.params.id}`,
        data: { name, slug, description, price, mainImg, categoryId },
      });

      const updatedProduct = response.data;
      await redis.del("user:users");
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
