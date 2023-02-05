import { PrismaClient, Sell } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let sells = await getSell(req)
  res.status(200).json(sells)
}

async function getSell(req: NextApiRequest): Promise<Array<Sell>> {

  if (req.query && req.query.q) {
    let query = req.query.q
    
    return await prisma.sell.findMany({
      where: {
        userId: {
          contains: query[0]
        }
      }
    })
  } else {
    return await prisma.sell.findMany({})
  }
}