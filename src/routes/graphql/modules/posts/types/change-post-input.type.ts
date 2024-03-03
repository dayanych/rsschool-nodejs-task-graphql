import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }
});
