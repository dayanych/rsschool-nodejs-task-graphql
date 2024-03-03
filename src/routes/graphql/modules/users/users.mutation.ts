import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../interfaces/context.interface.js';
import { UserType } from './types/user.type.js';
import { ChangeUserInputType } from './types/change-user-input.type.js';
import { CreateUserInputType } from './types/create-user-input.type.js';
import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

interface CreateUserArgs {
  dto: {
    name: string;
    balance: number;
  }
}

interface DeleteUserArgs {
  id: string;
}

interface ChangeUserArgs {
  id: string;
  dto: {
    name: string;
    balance: number;
  }
}

interface SubscribeArgs {
  userId: string;
  authorId: string;
}

export const usersMutation = {
  createUser: {
    type: UserType,
    args: {
      dto: {
        type: CreateUserInputType,
      }
    },
    resolve: async (_, args: CreateUserArgs, context: Context) => {
      const { prisma } = context;
      try {
        const user = await prisma.user.create({
          data: args.dto,
        });

        return user;
      } catch {
        throw new Error('Something went wrong.');
      }
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_, args: DeleteUserArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const user = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!user) {
        throw httpErrors.notFound();
      }

      await prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    }
  },
  changeUser: {
    type: UserType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangeUserInputType,
      }
    },
    resolve: async (_, args: ChangeUserArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const user = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!user) {
        throw httpErrors.notFound();
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });

      return updatedUser;
    }
  },
  subscribeTo: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args: SubscribeArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const user = await prisma.user.findUnique({ where: { id: args.userId } });
      const author = await prisma.user.findUnique({ where: { id: args.authorId } });

      if (!user || !author) {
        throw httpErrors.notFound();
      }

      return await prisma.user.update({
        where: {
          id: args.userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: args.authorId,
            },
          }
        }
      });
    }
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args: SubscribeArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const user = await prisma.user.findUnique({ where: { id: args.userId } });
      const author = await prisma.user.findUnique({ where: { id: args.authorId } });

      if (!user || !author) {
        throw httpErrors.notFound();
      }

      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });

      return true;
    },
  }
};
