import { PrismaClient, Sell } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const sell = await createSell(req)
    res.status(201).json(sell)
  } else {
    let sells = await getSell(req)
    res.status(200).json(sells)
  }
}
async function createSell(req: NextApiRequest): Promise<Sell> {
  const { userId, address, price, status, user, sold  } = req.body
  return await prisma.sell.create({
    data: {
      userId: userId,
      address: address,
      price: price,
      status: status,
      sold: sold,
      user: user,
      createdAt: new Date()
    }
  })
}
async function getSell(req: NextApiRequest): Promise<Array<Sell>> {
    return await prisma.sell.findMany({})
}