require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");
const IsEmail = require("isemail");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const PORT = process.env.PORT || 4000;
const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || ''
    const email = Buffer.from(auth, 'base64').toString('ascii')
    if (!IsEmail.validate(email)) return { user: null }
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } })
    const user = users && users[0] || null
    return { user: { ...user.dataValues } }
  },

  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(() => {
  console.log(`
        Server is running!
        Listening on port ${PORT}
    `);
});
