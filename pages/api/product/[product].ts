import { PrismaClient, Product } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let products = await getProduct(req)
  res.status(200).json(products)
}
async function getProduct(req: NextApiRequest): Promise<Array<Product>> {
  if (req.query && req.query.product) {
    let query = req.query.product
    return await prisma.product.findMany({
      where: {
        title: {
          contains: query[0]
        }
      }
    })
  } else {
    return await prisma.product.findMany({})
  }
}