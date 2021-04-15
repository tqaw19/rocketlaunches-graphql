<<<<<<< HEAD
require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
=======
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema')
const { createStore } = require('./utils')
const resolvers = require('./resolvers')
>>>>>>> 8d00c1931984dbb9d88cfe70fe75ed17e8264eb0

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();

const server = new ApolloServer({
<<<<<<< HEAD
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});
=======
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
})
>>>>>>> 8d00c1931984dbb9d88cfe70fe75ed17e8264eb0

server.listen().then(() => {
  console.log(`
        Server is running!
        Listening on port 4000
    `);
});

