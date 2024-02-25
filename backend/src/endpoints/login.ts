import { Hono } from 'hono';
import { validateHash } from '../security';
import { z } from 'zod';
import { validate } from '../validation';
import { errorResponse, successResponse } from '../responses';
import { StatusCodes } from 'http-status-codes';
import { DatabaseEnv, getPrismaClient } from '../database';
import { createUser, createUserToken, getUser } from '../users';

const LoginRequestBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

const app = new Hono<DatabaseEnv>();

app.post("/", async (c) => {
  const prisma = getPrismaClient(c);
  
  let body = await c.req.json().then((data) => validate(data, LoginRequestBodySchema));
  if (body instanceof Response) {
    return body;
  }
  
  const user = await getUser(body.username, prisma);
  
  let token: string;
  let status = StatusCodes.OK;
  
  if (user === null) {
    token = await createUser(body.username, body.password, prisma);
    status = StatusCodes.CREATED;
  } else {
    if (!(await validateHash(body.password, user.hash, user.salt))) {
      return errorResponse(StatusCodes.UNAUTHORIZED, 'Incorrect password');
    }
    token = await createUserToken(body.username, prisma);
  }
  
  return successResponse(status, 'Token generated', { token });
});

export default app;