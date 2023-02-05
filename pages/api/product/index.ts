import { PrismaClient, Product } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const product = await createProduct(req)
    res.status(201).json(product)
  } else {
    let products = await getProduct(req)
    res.status(200).json(products)
  }
}
async function createProduct(req: NextApiRequest): Promise<Product> {
  const { image, title, description, cantity, price, warranty,  } = req.body
  return await prisma.product.create({
    data: {
      image: image!== undefined ? image : 'defaultURL',
      title: title,
      description: description!== undefined ? description : {},
      cantity: cantity,
      price: price!== undefined ? price : 999999999,
      authenticity: 0,
      returnPolicy: 0,
      warranty: warranty,
      createdAt: new Date()

    }
  })
}
async function getProduct(req: NextApiRequest): Promise<Array<Product>> {
    return await prisma.product.findMany({})
}