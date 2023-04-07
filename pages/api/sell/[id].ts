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
    if (req.method == "PUT") {
      const sell = await putSell(req)
      res.status(201).json(sell)
    } else if (req.method == "DELETE") {
      const sell = await deleteSell(req)
      res.status(201).json(sell)
    } else {
      let sell = await getSell(req)
      res.status(200).json(sell)
    }
   }
  
}
async function putSell(req: NextApiRequest): Promise<Array<Sell>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
  
      await prisma.sell.update({
        where: {
        id: query
        },
          data: req.body[0]

      })
      return await prisma.sell.findMany({
        where: {
        id: query
        }
      })
  

  } else {
    return await prisma.sell.findMany({})
  }
}
async function deleteSell(req: NextApiRequest): Promise<Array<Sell>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    
    await prisma.sell.deleteMany({
      where: {
      id: query
      },
    })
    return await prisma.sell.findMany({
      where: {
      id: query
      }
    })
  } else {
    return await prisma.sell.findMany({
      where: {
      id: query
      }
    })
  }
}
async function getSell(req: NextApiRequest): Promise<Array<Sell>> {
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.sell.findMany({
      where: {
        id:  query
      }
    })
  } else {
    return await prisma.sell.findMany({})
  }
}