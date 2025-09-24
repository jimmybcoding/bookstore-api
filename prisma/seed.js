const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const harryPotterOne = await prisma.book.upsert({
    where: { isbn: '' },
    update: {},
    create: {
      title: '',
      author: '',
      isbn: '',
      published: new Date(''),
    },
  })

  const jkRowling = await prisma.author.upsert({
    where: { name: ''},
    update: {},
    create: {
      name: '',
      bio: '',
    },
  })

  const jimmy = await prisma.user.upsert({
    where: { email: '' },
    update: {},
    create: {
        email: '',
        name: '',
    }
  })
  console.log({ harryPotterOne, jkRowling, jimmy })
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