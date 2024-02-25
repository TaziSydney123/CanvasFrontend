import { DatabaseEnv, getPrismaClient } from '../database';

import { Hono } from 'hono';
import { z } from 'zod';
import { validate } from '../validation';
import { successResponse } from '../responses';
import { StatusCodes } from 'http-status-codes';

const app = new Hono<DatabaseEnv>();

const SimilarUsernamesRequestBodySchema = z.object({
  username: z.string(),
  excludeNames: z.array(z.string()),
  skip: z.optional(z.number())
});

const MAX_SEARCH_AMOUNT = 10;

app.post("/", async (c) => {
  const prisma = getPrismaClient(c);
  
  let body = await c.req.json().then((data) => validate(data, SimilarUsernamesRequestBodySchema));
  if (body instanceof Response) {
    return body;
  }

  const { username, excludeNames, skip } = body;
  
  let users: string[];

  if (username === "") {
    users = (await prisma.user.findMany({
      take: MAX_SEARCH_AMOUNT,
      skip: skip
    })).map(user => user.username);
  } else {
        users = (await prisma.user.findMany({
            where: {
            username: {
                contains: username,
                mode: "insensitive"
            },
            NOT: {
                username: {
                in: excludeNames
                }
            }
            },
            take: MAX_SEARCH_AMOUNT
        })).map(user => user.username);
    }

  return successResponse(StatusCodes.OK, "Success", users);    
});

export default app;