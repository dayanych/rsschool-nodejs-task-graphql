import { GraphQLInputObjectType, GraphQLString, GraphQLFloat } from 'graphql';

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }
});
