import { PrismaClient, Product } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "PUT") {
    if (!req.headers['sec-fetch-site']) {
      return res.status(401).send("You are not authorized to call this API");
    } else{ 
      const product = await putProduct(req)
      res.status(201).json(product)
     }

  } else if (req.method == "DELETE") {
    if (!req.headers['sec-fetch-site']) {
      return res.status(401).send("You are not authorized to call this API");
    } else{ 
      const product = await deleteProduct(req)
      res.status(201).json(product)
     }


  } else {
    const products = await getProduct(req)
    res.status(200).json(products)
  }
}
async function putProduct(req: NextApiRequest): Promise<Array<Product>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
      await prisma.product.update({
        where: {
          id: query
        },
          data: req.body[0]

      })
      return await prisma.product.findMany({
        where: {
          id: query
        }
      })
  

  } else {
    return await prisma.product.findMany({})
  }
}
async function deleteProduct(req: NextApiRequest): Promise<Array<Product>> {
  const query:string = req.query.id as string;
  
  if (req.query && req.query.id) {
    
    await prisma.product.deleteMany({
      where: {
        id: query
      },
    })
    return await prisma.product.findMany({
      where: {
        id: query
      }
    })
  } else {
    return await prisma.product.findMany({
      where: {
        id: query
      }
    })
  }
}
async function getProduct(req: NextApiRequest): Promise<Array<Product>> {
  
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.product.findMany({
      where: {
        id:  query
      }
    })
  } else {
    return await prisma.product.findMany({})
  }
}