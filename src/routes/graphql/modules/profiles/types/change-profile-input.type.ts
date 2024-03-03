import { GraphQLInputObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeIdType } from '../../member-types/types/member-type-id.type.js';

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
      type: MemberTypeIdType,
    },
    userId: {
      type: UUIDType,
    }
  }
});
