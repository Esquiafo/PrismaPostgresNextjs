import { PrismaClient, Sell } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto";
const prisma = new PrismaClient()
interface User {
  id: string;
  image: string | null
  sells: Sell | null;
  name: string | null;
  surname?: string | null;
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
  if (!req.headers['sec-fetch-site']) {
    return res.status(401).send("You are not authorized to call this API");
  } else{
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
      }) as User[];
  

  } else {
    return await prisma.user.findMany({}) as User[];
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
    }) as User[];
  } else {
    return await prisma.user.findMany({
      where: {
        id: query
      }
    }) as User[];
  }
}
async function getUser(req: NextApiRequest): Promise<Array<User>>  {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const email = req.query.email as string;
  const password = req.query.password as string;
  const isValid = validateEmail(email)

  if (isValid) {
    return await prisma.user.findMany({
      where: {
        email: email,
        password:  password
      }, 
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as unknown as User[];
  } else {
    return { status: 'Dont Find' } as unknown as User[];
  }
}
