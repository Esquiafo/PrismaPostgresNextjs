import { PrismaClient, Brand } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const brand = await createBrand(req)
    res.status(201).json(brand)
  } else {
    let brand = await getBrand(req)
    res.status(200).json(brand)
  }
}
async function createBrand(req: NextApiRequest): Promise<Brand> {
  return await prisma.brand.create({
    data: req.body[0] 
  })
}
async function getBrand(req: NextApiRequest): Promise<Array<Brand>> {
  return await prisma.brand.findMany({})
}