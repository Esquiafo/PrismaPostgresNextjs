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

async function getUser(req: NextApiRequest): Promise<User[]> {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  
  const query = req.query.id as string;
  const isValid = validateEmail(query)
  console.log(query)
  console.log(isValid)
  if (!isValid) {
    return await prisma.user.findMany({
      where: {
        id: query,
      },
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
  } else {
    return await prisma.user.findMany({
      where: {
        email: query,
      },
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
}