import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';    
import { getUsers, createUser, updateUser, deleteUser, addBookToUser, removeBookFromUser } from './routes/users.js';
import { getBooks, getRandomBook, createBook, updateBook, deleteBook } from './routes/books.js';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from './routes/authors.js';
import { login } from './routes/login.js';
import swaggerUi from 'swagger-ui-express'; 
import { swaggerSpec } from './swagger.js';
import { verifyToken } from './authMiddleware.js';  


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
app.get('/users', verifyToken, getUsers);
app.post('/users', createUser);
app.put('/users/:id', verifyToken, updateUser);
app.delete('/users/:id', verifyToken, deleteUser);
app.post('/users/:userId/books/:bookId', verifyToken, addBookToUser);
app.delete('/users/:userId/books/:bookId', verifyToken, removeBookFromUser);

// Books routes
app.get('/books', getBooks);
app.get('/books/random', getRandomBook);
app.post('/books', verifyToken, createBook);
app.put('/books/:id', verifyToken, updateBook);
app.delete('/books/:id', verifyToken, deleteBook);

// Authors routes
app.get('/authors', verifyToken, getAuthors);
app.post('/authors', verifyToken, createAuthor);
app.put('/authors/:id', verifyToken, updateAuthor);
app.delete('/authors/:id', verifyToken, deleteAuthor);

// Login route
app.post('/login', login);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});