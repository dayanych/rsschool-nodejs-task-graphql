import { GraphQLObjectType } from 'graphql';
import { usersQuery } from '../modules/users/users.query.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...usersQuery
  },
});
