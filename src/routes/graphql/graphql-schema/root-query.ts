import { GraphQLObjectType } from 'graphql';
import { usersQuery } from '../modules/users/users.query.js';
import { profilesQuery } from '../modules/profiles/profiles.query.js';
import { memberTypesQuery } from '../modules/member-types/member-types.query.js';
import { postsQuery } from '../modules/posts/posts.query.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...usersQuery,
    ...profilesQuery,
    ...memberTypesQuery,
    ...postsQuery,
  },
});
