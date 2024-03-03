import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../interfaces/context.interface.js';
import { UserType } from './types/user.type.js';
import { ChangeUserInputType } from './types/change-user-input.type.js';
import { CreateUserInputType } from './types/create-user-input.type.js';

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

      const deletedUser = await prisma.user.delete({
        where: {
          id: args.id,
        },
      });

      return deletedUser;
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
  }
};
