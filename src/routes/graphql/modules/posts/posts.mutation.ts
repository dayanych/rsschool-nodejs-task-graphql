import { PostType } from './types/post.type.js';
import { Context } from '../../interfaces/context.interface.js';
import { CreatePostInputType } from './types/create-post-input.type.js';
import { ChangePostInputType } from './types/change-post-input.type.js';
import { UUIDType } from '../../types/uuid.js';

interface CreatePostArgs {
  dto: {
    title: string;
    content: string;
    authorId: string;
  }
}

interface ChangePostArgs {
  id: string;
  dto: {
    title: string;
    content: string;
    authorId: string;
  }
}

export const postsMutation = {
  createPost: {
    type: PostType,
    args: {
      dto: {
        type: CreatePostInputType,
      }
    },
    resolve: async (_, args: CreatePostArgs, context: Context) => {
      const { prisma } = context;
      return await prisma.post.create({
        data: args.dto
      });
    },
  },
  changePost: {
    type: PostType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangePostInputType,
      },
    },
    resolve: async (_, args: ChangePostArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const post = await prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!post) {
        throw httpErrors.notFound();
      }

      const updatedPost = await prisma.post.update({
        where: {
          id: args.id,
        },
        data: args.dto
      });

      return updatedPost;
    }
  },
  deletePost: {
    type: PostType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_, args: ChangePostArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const post = await prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!post) {
        throw httpErrors.notFound();
      }

      await prisma.post.delete({
        where: {
          id: args.id,
        },
      });
    }
  }
};
