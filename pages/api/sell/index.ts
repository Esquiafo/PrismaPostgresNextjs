import { PrismaClient, Sell } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!req.headers['sec-fetch-site']) {
    return res.status(401).send("You are not authorized to call this API");
  } else{ 
    if (req.method == "POST") { 
    
      const sell = await createSell(req)
      res.status(201).json(sell)
    } else {
      let sells = await getSell(req)
      res.status(200).json(sells)
    }
  }

}
async function createSell(req: NextApiRequest): Promise<Sell> {
  return await prisma.sell.create({
    data: req.body[0]
  })
}
async function getSell(req: NextApiRequest): Promise<Array<Sell>> {
    return await prisma.sell.findMany({})
}