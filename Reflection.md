# Reflection

## 23/9/25 Work

I confirmed the project requirements and decided to go with a NodeJS + Express + Prisma + Neon stack mostly for familiarity. As I was refreshing myself in the Prisma docs I realized that Prisma now offers a next-gen serverless Postgres database. So I decided to change course and try that out. I will go back to Neon if needed but it seems like it'll be really easy to spin up.

## 24/9/25 Work

I ran into my first challenges while trying to seed my Prisma postgres db. Just some trial and error with relationships. In my seed file I was trying to create books that already existed instead of using connect and I was accessing author before it was initialized, minor errors like that. I got the db seeded and then defined get routes for my 3 db tables and confirmed they were working in the browser. I also avoided the challenge of intense frustration with forgetting to restart the server by installing nodemon.

## 29/9/25 Work

I created the rest of my CRUD routes for books, authors, and users. I made the workflow design choice to use the REST client extension for quick testing during development. Another important part was validating input, like checking that an author exists before creating a book, or confirming a user and book both exist before connecting them. I tried to think about how errors would realistically be handled in a production API.

## 4/10/25 - 5/10/25 Work

I was done with all of the core requirements other than the openAPI doc which I will do at the very end. I really wanted to work on this project more so I decided to build a frontend and figured if I get too carried away and go too outside of the scope of the project I can just submit a release link to the basic backend only version. I decided to keep the entire front end in a client folder and went with a Vite + React + TailwindCSS setup. My idea was to show CRUD routes working in the frontend, I decided on an admin page with a UI to test the routes, and a landing page with modern styling and a books page for users to browse books. I expanded my books table in the db to include price and pic fields to make it more professional looking. I added a get route for a random book to feature on my landing page. Next i'll build out the admin page and think about locking it behind admin accounts which will require changes to the users table.

## 17/10/25 - 18/10/25 Work

I got the CRUD routes all working in the frontend and the Tailwind styling to a point where I am very happy. I was thinking about how someone could easily run the fullstack app locally and decided to go with docker. I've worked with docker before, so it went smoothly. I decided to do the openapi docs next. I went JS over JSON/YAML because I felt that it would be easier for me to maintain and keep in sync with the code if I add more features like login/auth and a shopping cart. I chose to define schemas in the swagger file and reference them in the routes to make development quicker. Proper identation in the openapi specs was a bit of a challenge at first.

## 19/10/25 - 02/11/25 Work

It was bothering me that all of my routes were exposed on the admin page in the frontend even though this project started as strictly an API. I decided to implement JSON Web Tokens in local storage for authorization to protect my admin routes and just leave routes for UX/UI unprotected. I took time to carefully plan this as out and implement as it meant refactoring the database, backend and frontend. I decided seeding a single admin account through a boolean flag in my user model for access management. Initially, I was verifying the token in the routes but refactored to a middleware function to save myself work and keep the code clean. I have experience with React hooks, going with context for authorization in the frontend went well. I made a design compromise. I wanted this project to be able to be set up as easily and quickly as possible, just clone it and run docker. So I made the choice to include the .env secrets in the docker-compose.yml to avoid the extra steps of creating the env. I also included the true admin email and password in the swagger example fields for POST /login to speed up trying the docs. Rest assured, this is purely for our ease of testing, I know this is unacceptable in a production project.
