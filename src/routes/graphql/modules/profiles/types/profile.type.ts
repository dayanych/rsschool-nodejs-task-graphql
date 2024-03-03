import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeType } from '../../member-types/types/member-type.type.js';
import { Context } from '../../../interfaces/context.interface.js';

interface ProfileParent {
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: GraphQLString,
    },
    memberType: {
      type: MemberTypeType,
      resolve: async (parent: ProfileParent, __, context: Context) => {
        const { prisma } = context;

        return await prisma.memberType.findUnique({
          where: {
            id: parent.memberTypeId,
          },
        });
      }
    }
  }),
});
