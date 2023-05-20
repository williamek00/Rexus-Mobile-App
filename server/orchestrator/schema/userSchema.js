const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = `#graphql
  type User {
    id : ID
    username : String
    email : String
    role : String
    phoneNumber : String
    address : String
  }

  #Router
  #GET
  type Query {
    users : [User],
  }
  #POST PUT PATCH
  type Mutation{
    addUser(username: String , email : String ,password : String , role : String , phoneNumber : String , address : String ) : User,
    deleteUser(userId: ID!): String
  }

`;

const base_url =  process.env.BASE_URL_USER || "http://localhost:4001"
const resolvers = {
    Query : {
        users : async () => {
            try {
                const userCache = await redis.get("user:users");
                if (userCache) {
                  const data = JSON.parse(userCache);
                  return data.users;
                } else {
                  const { data } = await axios.get(
                    `${base_url}/users`
                  );
                  await redis.set("user:users", JSON.stringify(data));
                  return data.users;
                }
              } catch (error) {
                throw error;
              }
        }
    },
    Mutation: {
        addUser: async (_, args) => {
          try {
            const {
                username,
                email,
                password,
                role,
                phoneNumber,
                address,
            } = args;
            const { data } = await axios.post(
              `${base_url}/users`,
              {
                username,
                email,
                password,
                role,
                phoneNumber,
                address,
            }
            );
            await redis.del("user:users");
            return data;
          } catch (error) {
            throw error;
          }
        },
       
        deleteUser: async (_, { userId }) => {
          try {
            const { data } = await axios.delete(
              `${base_url}/users/${userId}`
            );
            await redis.del("user:users");
            return "Product deleted successfully";
          } catch (error) {
            throw error;
          }
        },
      },
    
}
module.exports = [typeDefs, resolvers];
