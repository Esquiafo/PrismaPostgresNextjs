import { PrismaClient, Sell } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface User {
  id: string;
  image: string | null;
  name: string | null;
  surname?: string | null;
  email: string;
  password: string;
  phone?: string | null;
  emailVerified: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const reqOrigin = req.headers.origin;
  const reqHost = `https://${req.headers.host}`;
  if (reqHost == reqOrigin || req.headers.authorization == process.env.API_KEY) {
    if (req.method == "POST") {
      const user = await createUser(req);
      res.status(201).json(user);
    } else {
      let users = await getUsers(req);
      res.status(200).json(users);
    }
  } else{ 
    return res.status(401).send("You are not authorized to call this API");
   }

}

async function  createUser(req: NextApiRequest): Promise<User> {
  
  const { email, password, ...userData } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with that email already exists.");
  }
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      surname: userData.surname,
      name: userData.nombre,
      password: hashedPassword,
      phone: userData.password
    },
  });
  return newUser as User;
}

async function getUsers(req: NextApiRequest): Promise<Array<User>> {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  }) as User[];;
}
