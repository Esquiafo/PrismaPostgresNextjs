import { PrismaClient, Brand } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "PUT") {
    const brand = await putBrand(req)
    res.status(201).json(brand)
  } else if (req.method == "DELETE") {
    const brand = await deleteBrand(req)
    res.status(201).json(brand)
  } else {
    const brand = await getCategory(req)
    res.status(200).json(brand)
  }
}
async function putBrand(req: NextApiRequest): Promise<Array<Brand>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
      await prisma.brand.update({
        where: {
          name: query.toUpperCase()
        },
          data: req.body[0]

      })
      return await prisma.brand.findMany({
        where: {
          name: query.toUpperCase()
        }
      })
  

  } else {
    return await prisma.brand.findMany({})
  }
}
async function deleteBrand(req: NextApiRequest): Promise<Array<Brand>> {
  const query:string = req.query.id as string;
  
  if (req.query && req.query.id) {
    
    await prisma.brand.deleteMany({
      where: {
        name: query.toUpperCase()
      },
    })
    return await prisma.brand.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  } else {
    return await prisma.brand.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  }
}
async function getCategory(req: NextApiRequest): Promise<Array<Brand>> {
  
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.brand.findMany({
      where: {
        name:  query.toUpperCase()
      },
      include: {
        items: true,
      },
    })
  } else {
    return await prisma.brand.findMany({})
  }
}