const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
    const jkRowling = await prisma.author.upsert({
    where: { name: 'J.K. Rowling' },
    update: {},
    create: {
      name: 'J.K. Rowling',
      bio: 'A British author, best known for the Harry Potter series.',
    }
  })

    const harryPotterOne = await prisma.book.upsert({
    where: { isbn: '9781338878929' },
    update: {},
    create: {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878929',
      published: new Date('1998-09-01'),
    },
  })

    const harryPotterTwo = await prisma.book.upsert({
    where: { isbn: '9781338878936' },
    update: {},
    create: {
      title: 'Harry Potter and the Chamber of Secrets',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878936',
      published: new Date('2023-05-02'),
    },
  })

  const jimmy = await prisma.user.upsert({
    where: { email: 'jimmy@gmail.com' },
    update: {},
    create: {
        email: 'jimmy@gmail.com',
        name: 'James B',
        books: {
            connect: [
                {isbn: '9781338878929'}, 
                {isbn: '9781338878936'}
            ]
        }
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