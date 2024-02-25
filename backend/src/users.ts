import { getPrismaClient } from './database';
import { hash, getToken } from './security';

export async function createUser<createToken extends boolean, R = createToken extends true ? string : null>(username: string, password: string, prisma: ReturnType<typeof getPrismaClient>, createToken: boolean = true): Promise<R> {
  let token: string | null = null;
  const hashSalt = await hash(password);
  const userData: { username: string, hash: string, salt: string, tokens?: { create: { id: string } } } = {
    username: username,
    hash: hashSalt.hash,
    salt: hashSalt.salt
  };

  if (createToken) {
    token = getToken();
    userData.tokens = {
      create: {
        id: token
      }
    };
  }
  await prisma.user.create({ data: userData, include: { tokens: true } });

  return token as R;
}

export async function createUserToken(username: string, prisma: ReturnType<typeof getPrismaClient>) {
  const token = getToken();
  await prisma.token.create({
    data: {
      id: token,
      userUsername: username,
    },
  });

  return token;
}

export async function getUser(username: string, prisma: ReturnType<typeof getPrismaClient>) {
  return (await prisma.user.findUnique({
    where: { username: username },
  }));
}

export async function getUsernameFromToken(token: string, prisma: ReturnType<typeof getPrismaClient>) {
  return (await prisma.user.findFirst({
    where: { tokens: { some: { id: token } } },
    include: { tokens: true }
  }))?.username;
}
