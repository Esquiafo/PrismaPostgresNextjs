import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const prisma = new PrismaClient();

const corsMiddleware = cors({
  origin: process.env.API_URL_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await corsMiddleware(req, res, async () => {
      if (req.method === "POST") {
        const user = await checkUser(req);
        if (user.error) {
          res.status(401).json(user);
        } else {
          res.status(200).json(user);
        }
      }
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function checkUser(req: NextApiRequest): Promise<any> {
  console.log(req.body);

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

  const token = jwt.sign({ id, name, emailVerified }, secretKey);

  return {
    id,
    token,
  };
}
