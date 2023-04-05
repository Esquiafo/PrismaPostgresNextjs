
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import Cors from 'cors';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  res.setHeader("Access-Control-Allow-Origin", "https://prisma-postgres-nextjs.vercel.app/");
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Rest of the API logic
  if (req.method === "POST") {
    const user = await checkUser(req);
    res.status(200).json(user);
    return user;
  }
}
 {
 


}

async function checkUser(req: NextApiRequest): Promise<any> {
  console.log(req.body)
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.loginEmail,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      password: true,
      loginSession: true,
    },
  });
 
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.loginPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return { error: "Invalid email or password" };
  }

  const { id, name, emailVerified } = user;

  const secretKey = process.env.API_KEY;

  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }

  const token = jwt.sign(id, secretKey);

  return {
    id,
    token,
  };
}
