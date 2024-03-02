import { GraphQLObjectType } from 'graphql';
import { usersMutation } from '../modules/users/users.mutation.js';

export const rootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...usersMutation,
  },
});
