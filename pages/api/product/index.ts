import { PrismaClient, Product } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    if (!req.headers['sec-fetch-site']) {
      return res.status(401).send("You are not authorized to call this API");
    } else{ 
    const product = await createProduct(req)
    res.status(201).json(product)
     }
    
  } else {
    let products = await getProduct(req)
    res.status(200).json(products)
  }
}
async function createProduct(req: NextApiRequest): Promise<Product> {
  return await prisma.product.create({
    data: req.body[0] 
  })
}
async function getProduct(req: NextApiRequest): Promise<Array<Product>> {
  return await prisma.product.findMany({})
}