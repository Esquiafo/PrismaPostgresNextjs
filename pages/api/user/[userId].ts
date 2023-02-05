import { PrismaClient, User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let users = await getUsers(req)
  res.status(200).json(users)
}

async function getUsers(req: NextApiRequest): Promise<Array<User>> {
  if (req.query && req.query.q) {
    let query = req.query.q
    return await prisma.user.findMany({
      where: {
        name: {
          contains: query[0]
        }
      }
    })
  } else {
    return await prisma.user.findMany({})
  }
}