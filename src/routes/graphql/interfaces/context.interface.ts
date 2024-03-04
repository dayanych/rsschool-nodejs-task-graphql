import { HttpErrors } from '@fastify/sensible';
import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Context {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
  dataloaders: Map<string, DataLoader<string, unknown>>;
}
