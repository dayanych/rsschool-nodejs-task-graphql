import { GraphQLList } from 'graphql';
import { MemberTypeType } from './types/member-type.type.js';
import { Context } from '../../interfaces/context.interface.js';
import { MemberTypeIdType } from './types/member-type-id.type.js';

interface MemberTypeArgs {
  id: string;
}

export const memberTypesQuery = {
  memberTypes: {
    type: new GraphQLList(MemberTypeType),
    resolve: async (_source, _args, context: Context) => {
      const { prisma } = context;
      const memberTypes = await prisma.memberType.findMany();
      return memberTypes;
    },
  },
  memberType: {
    type: MemberTypeType,
    args: {
      id: { type: MemberTypeIdType }
    },
    resolve: async (_source, args: MemberTypeArgs, context: Context) => {
      const { prisma, httpErrors } = context;
      const { id } = args;

      const memberType = await prisma.memberType.findUnique({
        where: {
          id,
        },
      });

      if (!memberType) {
        throw httpErrors.notFound();
      }

      return memberType;
    }
  }
};
