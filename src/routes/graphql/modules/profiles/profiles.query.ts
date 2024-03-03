import { GraphQLList } from 'graphql';
import { Context } from '../../interfaces/context.interface.js';
import { ProfileType } from './types/profile.type.js';
import { UUIDType } from '../../types/uuid.js';

interface ProfileArgs {
  id: string;
}

export const profilesQuery = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_source, _args, context: Context) => {
      const { prisma } = context;
      const profiles = await prisma.profile.findMany();
      return profiles;
    }
  },
  profile: {
    type: ProfileType,
    args: {
      id: { type: UUIDType }
    },
    resolve: async (_, args: ProfileArgs, context: Context) => {
      const { prisma, httpErrors } = context;
      const { id } = args;

      const profile = await prisma.profile.findUnique({
        where: {
          id,
        },
      });

      if (!profile) {
        throw httpErrors.notFound();
      }

      return profile;
    }
  }
};
