const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = `#graphql
  type Product {
    id : ID
    name : String
    slug : String
    description : String
    price : Int
    Category : Category
    Images : [Images]
    User : User
  }

  type Category {
    id : ID
    name : String
  } 

  type Images {
    id : ID
    imgUrl : String
    productId : Int
  }

  type User {
    email : String
  }

  #Router
  #GET
  type Query {
    products : [Product],
  }
  #POST PUT PATCH
  type Mutation{
    addProduct(name: String , description : String , price : Int , mainImg : String , categoryId : Int , image1 : String , image2 : String) : Product,
    updateProduct(name: String , description : String , price : Int , mainImg : String , categoryId : Int , image1 : String , image2 : String) : Product,
    deleteProduct(id: ID!): String
  }

`;
// resolver / controller
const base_url = process.env.BASE_URL_APP || "http://localhost:4002" ;

const resolvers = {
  Query: {
    products: async () => {
      try {
        const keyboardCache = await redis.get("app:products");
        if (keyboardCache) {
          const data = JSON.parse(keyboardCache);
          return data;
        } else {
          const { data } = await axios.get(`${base_url}/admin/keyboard`);
          await redis.set("app:products", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    products: async () => {
      try {
        const keyboardCache = await redis.get("app:products");
        if (keyboardCache) {
          const data = JSON.parse(keyboardCache);
          return data;
        } else {
          const { data } = await axios.get(`${base_url}/admin/webcam`);
          await redis.set("app:products", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    products: async () => {
      try {
        const keyboardCache = await redis.get("app:products");
        if (keyboardCache) {
          const data = JSON.parse(keyboardCache);
          return data;
        } else {
          const { data } = await axios.get(`${base_url}/admin/headset`);
          await redis.set("app:products", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const {
          name,
          description,
          price,
          mainImg,
          categoryId,
          image1,
          image2,
        } = args;
        const { data } = await axios.post(
          `${base_url}/admin/newproduct`,
          {
            name,
            description,
            price,
            mainImg,
            categoryId,
            image1,
            image2,
          }
        );
        await redis.del("app:products");
        return data;
      } catch (error) {
        throw error;
      }
    },
    updateProduct: async (_, { id, name, description, price }) => {
      try {
        const { data } = await axios.put(
          `${base_url}/admin/updateproduct/${id}`,
          {
            name,
            description,
            price,
          }
        );
        await redis.del("app:products");
        return data;
      } catch (error) {
        throw error;
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const { data } = await axios.delete(
          `${base_url}/admin/deleteproduct/${id}`
        );
        await redis.del("app:products");
        return "Product deleted successfully";
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
