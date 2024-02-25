import { Context, Env } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export type DatabaseEnv = Env & {
  DATABASE_URL: string;
};

export function getPrismaClient(c: Context<DatabaseEnv, "/user">) {
  const env: DatabaseEnv = {
    DATABASE_URL: c.env?.DATABASE_URL as string ?? "",
  };

  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
}