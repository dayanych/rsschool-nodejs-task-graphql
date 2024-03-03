import { Context } from '../../interfaces/context.interface.js';
import { UUIDType } from '../../types/uuid.js';
import { ChangeProfileInputType } from './types/change-profile-input.type.js';
import { CreateProfileInputType } from './types/create-profile-input.type.js';
import { ProfileType } from './types/profile.type.js';

interface CreateProfileArgs {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
  };
}

interface ChangeProfileArgs {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
  };
}

interface DeleteProfileArgs {
  id: string;
}

export const profilesMutation = {
  createProfile: {
    type: ProfileType,
    args: {
      dto: {
        type: CreateProfileInputType,
      },
    },
    resolve: async (_, args: CreateProfileArgs, context: Context) => {
      const { prisma } = context;

      const profile = await prisma.profile.create({
        data: args.dto,
      });

      return profile;
    },
  },
  changeProfile: {
    type: ProfileType,
    args: {
      id: {
        type: UUIDType,
      },
      dto: {
        type: ChangeProfileInputType,
      },
    },
    resolve: async (_, args: ChangeProfileArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const profile = await prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!profile) {
        throw httpErrors.notFound();
      }

      const updatedProfile = await prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });

      return updatedProfile;
    },
  },
  deleteProfile: {
    type: ProfileType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_, args: DeleteProfileArgs, context: Context) => {
      const { prisma, httpErrors } = context;

      const profile = await prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!profile) {
        throw httpErrors.notFound();
      }

      await prisma.profile.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
