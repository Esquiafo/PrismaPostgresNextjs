import { PrismaClient, Brand } from "@prisma/client"
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
      const brand = await putBrand(req)
      res.status(201).json(brand)
    }

  } else if (req.method == "DELETE") {
     if (!req.headers['sec-fetch-site']) {
      return res.status(401).send("You are not authorized to call this API");
    } else{
      const brand = await deleteBrand(req)
      res.status(201).json(brand)
    }

  } else {
    const brand = await getBrand(req)
    res.status(200).json(brand)
  }
}
async function putBrand(req: NextApiRequest): Promise<Array<Brand>> {
  let valuesFromGet = await getBrand(req)
  const query:string = req.query.id as string;
  let idQuery
  for (const key in valuesFromGet[0]) {
    for (const [key, value] of Object.entries( valuesFromGet )) {
      idQuery = value.id
     }
  }
  if (req.query && req.query.id) {
      await prisma.brand.update({
        where: {
          id: idQuery
        },
          data: req.body[0]

      })
      return await prisma.brand.findMany({
        where: {
          name: query.toUpperCase()
        }
      })
  

  } else {
    return await prisma.brand.findMany({})
  }
}

async function deleteBrand(req: NextApiRequest): Promise<Array<Brand>> {
  const query:string = req.query.id as string;
  
  if (req.query && req.query.id) {
    
    await prisma.brand.deleteMany({
      where: {
        name: query.toUpperCase()
      },
    })
    return await prisma.brand.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  } else {
    return await prisma.brand.findMany({
      where: {
        name: `${query.toUpperCase()}`
      }
    })
  }
}
async function getBrand(req: NextApiRequest): Promise<Array<Brand>> {
  
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.brand.findMany({
      where: {
        name:  query.toUpperCase()
      },
      include: {
        items: true,
      },
    })
  } else {
    return await prisma.brand.findMany({})
  }
}