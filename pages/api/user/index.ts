import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()
interface User {
  id: string;
  name: string | null;
  surname: string | null;
  email: string;
  password?: string;
  phone?: string | null;
  emailVerified: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const user = await createUser(req)
    res.status(201).json(user)
  } else {
    let users = await getUsers(req)
    res.status(200).json(users)
  }
}
async function createUser(req: NextApiRequest): Promise<User> {
  return await prisma.user.create({
    data: req.body[0]
  })
}
async function getUsers(req: NextApiRequest): Promise<Array<User>> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
}