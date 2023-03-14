// add the following boilerplate to configure your NextAuth.js setup
//  with your GitHub OAuth credentials and 
// the Prisma adapter:

// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

declare const process: {
  env: {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    SECRET:string;
  };
};


const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};