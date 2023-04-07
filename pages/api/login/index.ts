import { PrismaClient, User, Session } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (!req.headers.origin) {
    console.log(req.headers.origin)
    return res.status(403).json({ error: 'Invalid origin' });
  }

  if (req.method === "POST") {
    console.log('aca')
    const user = await checkUser(req);
    res.status(200).json(user);
    return;
  }else{
    res.status(200).json({status: "OK"});
  }
}


async function checkUser(req: NextApiRequest): Promise<any> {
  console.log(req.body)
  const user = await prisma.user.findFirst({
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