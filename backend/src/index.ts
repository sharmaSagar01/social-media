import createApolloServer from "./server";

require("dotenv").config();

createApolloServer()
  .listen({ port: process.env.PORT || 5000 })
  .then(({ url }) => console.log({ url }));
