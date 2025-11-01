import swaggerJsdoc from "swagger-jsdoc";

/*How to Test Protected Routes
1. Use POST /login with email: admin@spiceshelf.com, password: get it from the .env (it's included by default in the browser) 
2. Copy the token from the response
3. Click the Authorize button at the top
4. Paste token
5. Test away */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SpiceShelf Bookstore API",
      version: "1.0.0",
      description: "A RESTful Bookstore API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: { type: "integer", example: 8 },
            title: { type: "string", example: "Dune" },
            published: {
              type: "string",
              format: "date",
              example: "1965-08-01",
            },
            isbn: { type: "string", example: "9780441013593" },
            price: { type: "number", format: "float", example: 15 },
            pic: { type: "string", example: "images/dune.jpg" },
            authorId: { type: "integer", example: 2 },
            author: { $ref: "#/components/schemas/Author" },
          },
        },
        BookInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Dune" },
            published: {
              type: "string",
              format: "date",
              example: "1965-08-01",
            },
            isbn: { type: "string", example: "9780441013593" },
            price: { type: "number", format: "float", example: 15 },
            pic: { type: "string", example: "images/dune.jpg" },
            authorId: { type: "integer", example: 2 },
          },
          required: ["title", "published", "isbn", "price", "authorId"],
        },
        Author: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Frank Herbert" },
            bio: {
              type: "string",
              example:
                "Frank Herbert was a science fiction author best known for Dune.",
            },
            books: {
              type: "array",
              items: { $ref: "#/components/schemas/Book" },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", example: "jimmy@gmail.com" },
            name: { type: "string", example: "Jimmy" },
            isAdmin: { type: "boolean", example: false },
            books: {
              type: "array",
              items: { $ref: "#/components/schemas/Book" },
            },
          },
        },
        UserInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jimmy" },
            email: { type: "string", example: "jimmy@gmail.com" },
            password: { type: "string", example: "securePassword123" },
          },
          required: ["name", "email", "password"],
        },
        LoginInput: {
          type: "object",
          properties: {
            email: { type: "string", example: "admin@spiceshelf.com" },
            password: { type: "string", example: "adminPassword1" },
          },
          required: ["email", "password"],
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login Successful" },
            user: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                email: { type: "string", example: "admin@spiceshelf.com" },
                isAdmin: { type: "boolean", example: true },
              },
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "Error message" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/server.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
