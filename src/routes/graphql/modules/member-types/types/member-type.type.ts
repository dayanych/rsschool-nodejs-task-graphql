import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { Context } from '../../../interfaces/context.interface.js';

interface MemberTypeParent {
  id: string;
}

export const MemberTypeType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: GraphQLString,
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
