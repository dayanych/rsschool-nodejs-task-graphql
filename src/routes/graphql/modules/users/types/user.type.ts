import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { Context } from '../../../interfaces/context.interface.js';
import { ProfileType } from '../../profiles/types/profile.type.js';

interface UserParent {
  id: string;
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma } = context;
        return await prisma.profile.findUnique({
          where: {
            userId: parent.id
          }
        });
      }
    }
  }
});
