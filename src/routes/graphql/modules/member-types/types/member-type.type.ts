import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { Context } from '../../../interfaces/context.interface.js';
import { MemberTypeIdType } from './member-type-id.type.js';

interface MemberTypeParent {
  id: string;
}

export const MemberTypeType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: MemberTypeIdType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (parent: MemberTypeParent, __, context: Context) => {
        const { prisma } = context;

        return await prisma.profile.findMany({
          where: {
            memberTypeId: parent.id,
          },
        });
      },
    },
  }),
});
