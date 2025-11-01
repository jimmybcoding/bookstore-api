import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

async function main() {
  const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const hashedJimmyPassword = await bcrypt.hash('jimmy', 10);

    const jkRowling = await prisma.author.upsert({
    where: { name: 'J.K. Rowling' },
    update: {},
    create: {
      name: 'J.K. Rowling',
      bio: 'A British author, best known for the Harry Potter series.',
    }
  })

    const frankHerbert = await prisma.author.upsert({
    where: { name: 'Frank Herbert' },
    update: {},
    create: {
      name: 'Frank Herbert',
      bio: 'An American science fiction author, best known for the Dune series.',
    }
  })

    const harryPotterOne = await prisma.book.upsert({
    where: { isbn: '9781338878929' },
    update: {},
    create: {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878929',
      price: 15,
      pic: "images/harryPotter1.jpg",
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
      price: 15,
      pic: "images/harryPotter2.jpg",
      published: new Date('2023-05-02'),
    },
  })

    const harryPotterThree = await prisma.book.upsert({
    where: { isbn: '9781338878943' },
    update: {},
    create: {
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878943',
      price: 15,
      pic: "images/harryPotter3.jpg",
      published: new Date('2001-10-01'),
    },
  })

    const harryPotterFour = await prisma.book.upsert({
    where: { isbn: '9781338878950' },
    update: {},
    create: {
      title: 'Harry Potter and the Goblet of Fire',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878950',
      price: 25,
      pic: "images/harryPotter4.jpg",
      published: new Date('2002-09-01'),
    },
  })

    const harryPotterFive = await prisma.book.upsert({
    where: { isbn: '9781338878967' },
    update: {},
    create: {
      title: 'Harry Potter and the Order of the Phoenix',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878967',
      price: 20,
      pic: "images/harryPotter5.jpg",
      published: new Date('2003-05-02'),
    },
  })

   const harryPotterSix = await prisma.book.upsert({
    where: { isbn: '9781338878974' },
    update: {},
    create: {
      title: 'Harry Potter and the Half-Blood Prince', 
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878974',
      price: 20, 
      pic: "images/harryPotter6.jpg",
      published: new Date('2006-07-25'),
    },
  })
  
    const harryPotterSeven = await prisma.book.upsert({
    where: { isbn: '9781338878981' },
    update: {},
    create: {
      title: 'Harry Potter and the Deathly Hallows',
      author: { connect: { id: jkRowling.id } },
      isbn: '9781338878981',
      price: 30,
      pic: "images/harryPotter7.jpg",
      published: new Date('2023-05-02'),
    },
  })

    const dune = await prisma.book.upsert({
    where: { isbn: '9780441013593' },
    update: {},
    create: {
      title: 'Dune',
      author: { connect: { id: frankHerbert.id } },
      isbn: '9780441013593',
      price: 18,
      pic: "images/dune.jpg",
      published: new Date('2005-08-02'),
    },
    })

    const duneMessiah = await prisma.book.upsert({
    where: { isbn: '9780593098233' },
    update: {},
    create: {
      title: 'Dune Messiah',
      author: { connect: { id: frankHerbert.id } },
      isbn: '9780593098233',
      price: 18,
      pic: "images/duneMessiah.jpg",
      published: new Date('2019-06-04'),
    },
    })

  const jimmy = await prisma.user.upsert({
    where: { email: 'jimmy@gmail.com' },
    update: {},
    create: {
        email: 'jimmy@gmail.com',
        name: 'James B',
        password: hashedJimmyPassword,
        isAdmin: false,
        books: {
            connect: [
                {isbn: '9781338878929'}, 
                {isbn: '9781338878936'}
            ]
        }
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@spiceshelf.com'},
    update: {},
    create: {
      email: 'admin@spiceshelf.com',
      name: 'SpiceShelf Admin',
      password: hashedAdminPassword,
      isAdmin: true,
    },
  })

  console.log({ harryPotterOne, jkRowling, admin })
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