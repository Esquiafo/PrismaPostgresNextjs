import { PrismaClient, Category } from "@prisma/client"
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
      const cateogry = await putCategory(req)
      res.status(201).json(cateogry)
     }
   
  } else if (req.method == "DELETE") {
    
     if (!req.headers['sec-fetch-site']) {
      return res.status(401).send("You are not authorized to call this API");
    } else{ 
      const cateogry = await deleteCategory(req)
      res.status(201).json(cateogry)
     }
  
  } else {
    const cateogry = await getCategory(req)
    res.status(200).json(cateogry)
  }
}
async function putCategory(req: NextApiRequest): Promise<Array<Category>> {
  let valuesFromGet = await getCategory(req)
  const query:string = req.query.id as string;
  let idQuery
  for (const key in valuesFromGet[0]) {
    for (const [key, value] of Object.entries( valuesFromGet )) {
      idQuery = value.id
     }
  }
  if (req.query && req.query.id) {
      await prisma.category.update({
        where: {
          id: idQuery
        },
          data: req.body[0]

      })
      return await prisma.category.findMany({
        where: {
          name: query.toUpperCase()
        }
      })
  

  } else {
    return await prisma.category.findMany({})
  }
}
async function deleteCategory(req: NextApiRequest): Promise<Array<Category>> {
  const query:string = req.query.id as string;
  
  if (req.query && req.query.id) {
    
    await prisma.category.deleteMany({
      where: {
        name: query.toUpperCase()
      },
    })
    return await prisma.category.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  } else {
    return await prisma.category.findMany({
      where: {
        name: query.toUpperCase()
      }
    })
  }
}
async function getCategory(req: NextApiRequest): Promise<Array<Category>> {
  
  const query:string = req.query.id as string;
  if (req.query && req.query.id) {
    return await prisma.category.findMany({
      where: {
        name:  query.toUpperCase()
      },
      include: {
        items: true,
      },
    })
  } else {
    return await prisma.category.findMany({})
  }
}