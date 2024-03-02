import { GraphQLSchema } from 'graphql';
import { rootMutation } from './root-mutation.js';
import { rootQuery } from './root-query.js';

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
