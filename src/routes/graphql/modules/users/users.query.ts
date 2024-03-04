import { GraphQLList } from 'graphql';
import { Context } from '../../interfaces/context.interface.js';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from './types/user.type.js';

interface UserArgs {
  id: string;
}

export const usersQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_source, _args, context: Context) => {
      const { prisma } = context;
      const users = await prisma.user.findMany();
      return users;
    }
  },
  user: {
    type: UserType,
    args: {
      id: { type: UUIDType }
    },
    resolve: async (_source, args: UserArgs, context: Context) => {
      const { prisma } = context;
      const { id } = args;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    }
  }
};
