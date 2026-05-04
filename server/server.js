import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from './config/connection.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/auth.js';

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await db.once('open', async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
      context: async ({ req }) => {
        // run your auth middleware logic manually
        await authMiddleware(req, {}, () => {});
        return { user: req.user };
      },
    });

    console.log(`🚀 GraphQL server ready at ${url}`);
  });
};

startServer();