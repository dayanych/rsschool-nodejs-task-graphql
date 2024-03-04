import { GraphQLObjectType } from 'graphql';
import { usersMutation } from '../modules/users/users.mutation.js';
import { postsMutation } from '../modules/posts/posts.mutation.js';
import { profilesMutation } from '../modules/profiles/profiles.mutation.js';

export const rootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...usersMutation,
    ...profilesMutation,
    ...postsMutation,
  },
});
