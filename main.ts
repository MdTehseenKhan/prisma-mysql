import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient({log: ['query']})
const prisma = new PrismaClient()

async function main() {

  // *** Delete records ***
  // await prisma.user.deleteMany()
  // await prisma.userPreference.deleteMany()
  // await prisma.user.deleteMany({ where: { age: { lt: 18 } } })
  // await prisma.user.delete({ where: { email: "kyle@mail.com" } })

  // *** Create records ***
  // 1. Create a single record
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Tehseen",
  //     age: 20,
  //     email: "contact.tehseenkhan@gmail.com",
  //     role: 'ADMIN',
  //     userPreference: {
  //       create: {
  //         emailUpdates: true
  //       }
  //     },
  //   },
  //   // include: {
  //   //   userPreference: true
  //   // },
  //   select: {
  //     name: true,
  //     userPreference: { select: { id: true } },
  //   }
  // })
  // console.log({ user })

  // 2. Create Multiple records
  // const multipleUsers = await prisma.user.createMany({
  //   data: [
  //     {name: "Kyle", age: 27, email: "kyle@mail.com"},
  //     {name: "Cook", age: 52, email: "webdevsimplified@mail.com"},
  //   ]
  // })

  // *** Fetch records ***
  // 1. Fetch all Records
  // const users = await prisma.user.findMany()
  // console.log({ users })

  // const distinctUsers = await prisma.user.findMany({
  //   where: { 
  //     AND: [
  //       // name: { not: "Kyle" }
  //       { name: { equals: "Kyle" } },
  //       { name: { in: ["Kyle", "Cook"] } }
  //     ], 
  //     OR: [
  //       { age: { gte: 18  } }, 
  //       { email: { contains: "mail.com" } }
  //     ],
  //     posts: {
  //       some: {
  //         title: { startsWith: "News" }
  //       }
  //     }
  //   },
    // distinct: ['name'], // Return only one/first record that has specified name
    // take: 2, // Return first 2 records that has specified name
    // skip: 1, // Skips specified no. of records from beginning (in this case skips first record)
    // orderBy: { age: 'desc' }, // Returns records in specified order
  // })
  // console.log({distinctUsers})
  
  // 2. Fetch unique record
  // const unique = await prisma.user.findUnique({ 
  //   where: { 
  //     // Unique Constraints
  //     email: "kyle@mail.com",
  //     age_name: {
  //       age: 27,
  //       name: "Kyle"
  //     }
  //   }
  // })
  // console.log({ unique })

  // 3. prisma.create.findFirst({ where: { name: "Kyle" } })

  // *** Update Records ***
  // const user = await prisma.user.update({ where: { email: "kyle@mail.com" } }, data: { age: { increment: 1 } })
  // const user = await prisma.user.updateMany({ where: { name: "Kyle" } }, data: { name: "Kyle Cook" })

  // *** Connect | Disconnect ***
  // const userPreference = await prisma.userPreference.create({
  //   data: {
  //     emailUpdates: true
  //   }
  // })
  // const connectUser = await prisma.user.create({
  //   data: {
  //     name: "Tehseen",
  //     age: 20,
  //     email: "contact.tehseenkhan@gmail.com",
  //     userPreference: {
  //       connect: { id: userPreference.id },
  //       // disconnect: true // Boolean for one-to-one relationship
  //       // disconnect: { id: userPreference.id }, // Specific id for one-to-many OR many-to-many relationship
  //     }
  //   },
  //   include: { userPreference: true }
  // })
  // console.log({ connectUser })
}

main()
  .catch(async (e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })