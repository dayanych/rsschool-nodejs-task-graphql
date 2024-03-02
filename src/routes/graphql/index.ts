import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schema } from './graphql-schema/graphql-schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: { 200: gqlResponseSchema, },
    },
    async handler(req) {
      const source = req.body.query;
      const variables = req.body.variables;

      const res = await graphql({
        schema,
        source,
        variableValues: variables,
        contextValue: {
          prisma,
          httpErrors,
        },
      });

      return res;
    },
  });
};

export default plugin;
