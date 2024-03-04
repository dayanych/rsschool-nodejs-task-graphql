import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeType } from '../../member-types/types/member-type.type.js';
import { Context } from '../../../interfaces/context.interface.js';
import { MemberTypeIdType } from '../../member-types/types/member-type-id.type.js';
import DataLoader from 'dataloader';

interface ProfileParent {
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
    memberType: {
      type: MemberTypeType,
      resolve: async (parent: ProfileParent, __, context: Context) => {
        const { prisma, dataloaders } = context;

        let dl = dataloaders.get('memberType');

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const memberTypes = await prisma.memberType.findMany({
              where: {
                id: {
                  in: [...ids],
                },
              },
            });

            const sortedMemberTypes = ids.map((id) => memberTypes.find((memberType) => memberType.id === id));

            return sortedMemberTypes;
          });

          dataloaders.set('memberType', dl);
        }

        return dl.load(parent.memberTypeId);
      }
    }
  }),
});
