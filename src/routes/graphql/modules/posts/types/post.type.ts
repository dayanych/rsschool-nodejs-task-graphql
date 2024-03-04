import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { UserType } from '../../users/types/user.type.js';
import { Context } from '../../../interfaces/context.interface.js';

interface PostParent {
  authorId: string;
}

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
    author: {
      type: UserType,
      resolve: async (parent: PostParent, __, context: Context) => {
        const { prisma } = context;
        return await prisma.user.findUnique({
          where: {
            id: parent.authorId
          }
        });
      }
    },
  }),
});
