import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';    
import { getUsers, createUser, updateUser, deleteUser, addBookToUser, removeBookFromUser } from './routes/users.js';
import { getBooks, getRandomBook, createBook, updateBook, deleteBook } from './routes/books.js';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from './routes/authors.js';
import swaggerUi from 'swagger-ui-express'; 
import { swaggerSpec } from './swagger.js';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Users routes
app.get('/users', getUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.post('/users/:userId/books/:bookId', addBookToUser);
app.delete('/users/:userId/books/:bookId', removeBookFromUser);

// Books routes
app.get('/books', getBooks);
app.get('/books/random', getRandomBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

// Authors routes
app.get('/authors', getAuthors);
app.post('/authors', createAuthor);
app.put('/authors/:id', updateAuthor);
app.delete('/authors/:id', deleteAuthor);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});