import { Auth } from '@clerk/nextjs/server';

export type AuthData = {
  userId: string | null;
  sessionClaims: Auth["sessionClaims"];
  session: Auth["session"];
  // add other properties you need
}