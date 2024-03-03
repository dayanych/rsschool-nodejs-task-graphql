import { HttpErrors } from '@fastify/sensible';
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
}
