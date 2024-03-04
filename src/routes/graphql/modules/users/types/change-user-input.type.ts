import { GraphQLInputObjectType, GraphQLString, GraphQLFloat } from 'graphql';

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }
});
