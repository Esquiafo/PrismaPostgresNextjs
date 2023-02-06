import { PrismaClient, Category } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "PUT") {
    const cateogry = await putCategory(req)
    res.status(201).json(cateogry)
  } else if (req.method == "DELETE") {
    const cateogry = await deleteCategory(req)
    res.status(201).json(cateogry)
  } else {
    const cateogry = await getCategory(req)
    res.status(200).json(cateogry)
  }
}
async function putCategory(req: NextApiRequest): Promise<Array<Category>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
      await prisma.category.update({
        where: {
          name: query.toUpperCase()
        },
          data: req.body[0]

      })
      return await prisma.category.findMany({
        where: {
          name: query.toUpperCase()
        }
      })
  

  } else {
    return await prisma.category.findMany({})
  }
}
async function deleteCategory(req: NextApiRequest): Promise<Array<Category>> {
  const query:string = req.query.id as string;
  
  if (req.query && req.query.id) {
    
    await prisma.category.deleteMany({
      where: {
        name: query.toUpperCase()
      },
    })
    return await prisma.category.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  } else {
    return await prisma.category.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  }
}
async function getCategory(req: NextApiRequest): Promise<Array<Category>> {
  
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.category.findMany({
      where: {
        name:  query.toUpperCase()
      },
      include: {
        items: true,
      },
    })
  } else {
    return await prisma.category.findMany({})
  }
}