import { PrismaClient, Product, User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "PUT") {
    const user = await putUser(req)
    res.status(201).json(user)
  } else if (req.method == "DELETE") {
    const user = await deleteUser(req)
    res.status(201).json(user)
  } else {
    let user = await getUser(req)
    res.status(200).json(user)
  }
}
async function putUser(req: NextApiRequest): Promise<Array<User>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
      await prisma.user.update({
        where: {
         id: query
        },
          data: req.body[0]

      })
      return await prisma.user.findMany({
        where: {
         id: query
        }
      })
  

  } else {
    return await prisma.user.findMany({})
  }
}
async function deleteUser(req: NextApiRequest): Promise<Array<User>> {
  const query = req.body.id as string;
  if (req.query && req.query.id) {
    
    await prisma.user.deleteMany({
      where: {
        id: query
      },
    })
    return await prisma.user.findMany({
      where: {
        id: query
      }
    })
  } else {
    return await prisma.user.findMany({
      where: {
        id: query
      }
    })
  }
}
async function getUser(req: NextApiRequest): Promise<Array<User>> {
  const query = req.body.id as string;
  if (req.query && req.query.id) {
    return await prisma.user.findMany({
      where: {
        id:  query
      }
    })
  } else {
    return await prisma.user.findMany({})
  }
}