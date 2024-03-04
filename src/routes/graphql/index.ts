import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './graphql-schema/graphql-schema.js';
import depthLimit from 'graphql-depth-limit';

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
      const { query: source, variables } = req.body;

      const validationErrors = validate(schema, parse(source), [depthLimit(5)]);

      if (validationErrors.length > 0) {
        return {
          errors: validationErrors,
        };
      }

      const res = await graphql({
        schema,
        source,
        variableValues: variables,
        contextValue: {
          prisma,
          httpErrors,
          dataloaders: new Map(),
        },
      });

      return res;
    },
  });
};

export default plugin;
