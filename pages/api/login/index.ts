import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const user = await checkUser(req);
    res.status(200).json(user);
    return; // send the response and exit the function
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
  console.log('//////////////////////')
  const isPasswordCorrect = await bcrypt.compare(req.body.loginPassword, user.password);

  if (!isPasswordCorrect) {
    return { error: "Invalid email or password" };
  }

  const { id, name, emailVerified } = user;
  const token = jwt.sign({ userId: id }, "your-secret-key-here");
  const loginSession = await prisma.session.create({
    data: {
      user: { connect: { id } },
      token,
    },
  });

  return {
    id,
    name,
    loginSessionId: loginSession.id,
    token,
  };
}
