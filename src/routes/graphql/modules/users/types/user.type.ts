import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { Context } from '../../../interfaces/context.interface.js';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { PostType } from '../../posts/types/post.type.js';

interface UserParent {
  id: string;
}

export const UserType: GraphQLObjectType<UserParent, Context> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma } = context;
        return await prisma.post.findMany({
          where: {
            authorId: parent.id
          }
        });
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma } = context;
        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: parent.id,
              }
            }
          }
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma } = context;
        return await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: parent.id
              }
            }
          }
        });
      },
    }
  })
});
