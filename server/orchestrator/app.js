const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const [appTypeDefs,appResolvers] = require('./schema/appSchema.js')
const [userTypeDefs,userResolvers] = require('./schema/userSchema.js')

//  bikininstance

const server = new ApolloServer({
  typeDefs : [appTypeDefs , userTypeDefs],
  resolvers : [appResolvers , userResolvers] ,
  introspection : true
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
