import { PrismaClient } from '@prisma/client';
import { HttpErrors } from '@fastify/sensible';
import { UUIDType } from '../../types/uuid.js';
import { userType, createUserInputType, changeUserInputType } from './types/user.type.js';

interface Context {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
}

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

export const usersMutation = {
  createUser: {
    type: userType,
    args: {
      dto: {
        type: createUserInputType,
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
    type: userType,
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

      if (user === null) {
        throw httpErrors.notFound();
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id: args.id,
        },
      });

      return deletedUser;
    }
  },
  changeUser: {
    type: userType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: changeUserInputType,
      }
    },
    resolve: async (_, args: ChangeUserArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const user = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });

      if (user === null) {
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
  }
};
