import { HttpErrors } from '@fastify/sensible';
import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { userType } from './types/user.type.js';

interface Context {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
}

interface UserArgs {
  id: string;
}

export const usersQuery = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_source, _args, context: Context) => {
      const { prisma } = context;
      const users = await prisma.user.findMany();
      return users;
    }
  },
  user: {
    type: userType,
    args: {
      id: { type: UUIDType }
    },
    resolve: async (_source, args: UserArgs, context: Context) => {
      const { prisma, httpErrors } = context;
      const { id } = args;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (user === null) {
        throw httpErrors.notFound();
      }

      return user;
    }
  }
};
