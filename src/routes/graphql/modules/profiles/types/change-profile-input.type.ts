import { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: GraphQLString,
    },
    userId: {
      type: UUIDType,
    }
  }
});
