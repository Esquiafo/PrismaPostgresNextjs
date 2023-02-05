import { PrismaClient, User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

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
    return await prisma.user.findMany({})
}