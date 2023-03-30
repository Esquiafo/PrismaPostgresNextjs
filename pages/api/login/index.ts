import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const reqOrigin = req.headers.origin;
  const reqHost = `https://${req.headers.host}`;
  if (reqHost == reqOrigin || req.headers.authorization == process.env.API_KEY) {
    if (req.method === "POST") {
      console.log('aca')
      const user = await checkUser(req);
      res.status(200).json(user);
      return;
    }
    return res.status(401).send("You are not authorized to call this API");
    
  } else{
    return res.status(401).send("You are not authorized to call this API");
    
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
  const token = jwt.sign({ userId: id }, "your-secret-key-here");
  

  return {
    id,
    name,
    token,
  };
}
