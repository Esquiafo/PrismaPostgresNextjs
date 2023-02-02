import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {


//CREATE PRODUCT EXAMPLE
  await prisma.product.create({

    data: {
      title: 'Evga RTX 3080 10 GB',
      description: { fans: 3, rgb: 1, launch: 2020, version: "FHR V21092" },
      cantity: 5,
      price: 520.2,
      warranty: 6
    },

  })

// CREATE USER EXAMPLE
 const user = await prisma.user.create({

    data: {
      name: 'Jorge',
      surname: 'Lanate',
      email: 'jorgito@hotmail.com'
      

    },

  })
// READ EXAMPLE
  let items = await prisma.product.findMany({}) 

// #2 Converting the object to JSON...
  let json = JSON.stringify(items);
  let obj = JSON.parse(json)

//CREATE EXAMPLE SELLS
  await prisma.sell.create({
    data: {
      //RELATION OF USER 
      userId:    user!.id,
      address:   'Calle Falsa 123',
      price:     520.2,
      status:    0,
      sold:  obj
       
      
    }
  })
// UPDATE EXAMPLE OF USER
 await prisma.user.update({
  where: {
    email: 'jorgito@hotmail.com',
  },
  data: {
    surname: 'Jackson',
  },
}) 
// DELETA EXAMPLE OF PRODUCT
await prisma.product.deleteMany({
  where: {
    title: 'Evga RTX 3080 10 GB',
  },
})


}



main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })