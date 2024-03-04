import { GraphQLList } from 'graphql';
import { Context } from '../../interfaces/context.interface.js';
import { PostType } from './types/post.type.js';
import { UUIDType } from '../../types/uuid.js';

interface PostArgs {
  id: string;
}

export const postsQuery = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_, __, context: Context) => {
      const { prisma } = context;

      return await prisma.post.findMany();
    },
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_source, args: PostArgs, context: Context) => {
      const { prisma } = context;
      const { id } = args;

      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      return post;
    },
  }
};
