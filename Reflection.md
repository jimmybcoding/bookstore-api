# Reflection

## 23/9/25 Work 
I confirmed the project requirements and decided to go with a NodeJS + Express + Prisma + Neon stack mostly for familiarity. As I was refreshing myself in the Prisma docs I realized that Prisma now offers a next-gen serverless Postgres database. So I decided to change course and try that out. I will go back to Neon if needed but it seems like it'll be really easy to spin up.

## 24/9/25 Work
I ran into my first challenges while trying to seed my Prisma postgres db. Just some trial and error with relationships. In my seed file I was trying to create books that already existed instead of using connect and I was accessing author before it was initialized, minor errors like that. I got the db seeded and then defined get routes for my 3 db tables and confirmed they were working in the browser. I also avoided the challenge of intense frustration with forgetting to restart the server by installing nodemon.

## 29/9/25 Work
I created the rest of my CRUD routes for books, authors, and users. I made the workflow design choice to use the REST client extension for quick testing during development. Another important part was validating input, like checking that an author exists before creating a book, or confirming a user and book both exist before connecting them. I tried to think about how errors would realistically be handled in a production API.