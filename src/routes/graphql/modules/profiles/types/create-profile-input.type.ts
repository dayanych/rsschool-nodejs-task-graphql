import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeIdType } from '../../member-types/types/member-type-id.type.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeIdType),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    }
  }
});
