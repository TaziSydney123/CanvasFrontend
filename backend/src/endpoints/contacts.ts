import { DatabaseEnv, getPrismaClient } from '../database';

import { Hono } from 'hono';
import { z } from 'zod';
import { validate } from '../validation';
import { successResponse } from '../responses';
import { StatusCodes } from 'http-status-codes';
import { getUsernameFromToken } from '../users';

const app = new Hono<DatabaseEnv>();

const ContactsRequestBodySchema = z.object({
  token: z.string()
});

const MAX_SEARCH_AMOUNT = 10;

app.post("/", async (c) => {
  const prisma = getPrismaClient(c);
  
  let body = await c.req.json().then((data) => validate(data, ContactsRequestBodySchema));
  if (body instanceof Response) {
    return body;
  }

  const { token } = body;

  const username = await getUsernameFromToken(token, prisma);
  
  const canvases = await prisma.canvas.findMany({
    where: {
      users: {
        some: {
          username: username
        }
      }
    },
    include: {
      turn: true,
      users: true
    }
  });

  const contacts = canvases.map((canvas) => ({
      username: canvas.users.find((user) => user.username != username)?.username,
      status: canvas.turnUsername == username ? ContactStatus.WAITING_SELF : ContactStatus.WAITING_CONTACT
  })).filter(contact => contact.username != undefined);

  return successResponse(StatusCodes.OK, "Contacts found", {
    contacts
  });
});

export enum ContactStatus {
  WAITING_SELF = "WAITING_SELF",
  WAITING_CONTACT = "WAITING_CONTACT"
}

export default app;