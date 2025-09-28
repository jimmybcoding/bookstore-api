import express from 'express';
import  prisma  from './db.js';
import { getUsers } from './routes/users.js';
import { getBooks } from './routes/books.js';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from './routes/authors.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

// Users routes
app.get('/users', getUsers);

// Books routes
app.get('/books', getBooks);

// Authors routes
app.get('/authors', getAuthors);
app.post('/authors', createAuthor);
app.put('/authors/:id', updateAuthor);
app.delete('/authors/:id', deleteAuthor);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});