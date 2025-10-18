import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SpiceShelf Bookstore API',
      version: '1.0.0',
      description: 'A RESTful Bookstore API',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Development server'
      }
    ],
    components: {
        schemas: {
            Book: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    title: { type: 'string', example: 'Dune' },
                    published: { type: 'string', format: 'date', example: '1965-08-01' },
                    isbn: { type: 'string', example: '9780441013593' },
                    price: { type: 'number', format: 'float', example: 9.99 },
                    pic: { type: 'string', example: 'images/dune.jpg' },
                    authorId: { type: 'integer', example: 1 },
                    author:{ $ref: '#/components/schemas/Author' }
                }
            },
            Author: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Frank Herbert' },
                    bio: { type: 'string', example: 'Frank Herbert was a science fiction author best known for Dune.' },
                    books: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Book' }
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    email: { type: 'string', example: 'jimmy@gmail.com'},
                    name: { type: 'string', example: 'Jimmy' },
                    books: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Book' }
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Error message' }
                }
            }
        }
    }
  },
  apis: ['./src/routes/*.js', './src/server.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
