import { PrismaClient, Category } from "@prisma/client"
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
      const category = await createCategory(req)
      res.status(201).json(category)
    }
  } else {
    let category = await getCategory(req)
    res.status(200).json(category)
  }
}
async function createCategory(req: NextApiRequest): Promise<Category> {
  return await prisma.category.create({
    data: req.body[0] 
  })
}
async function getCategory(req: NextApiRequest): Promise<Array<Category>> {
    return await prisma.category.findMany({})
}