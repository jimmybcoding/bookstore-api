import express from 'express';
import  prisma  from './db.js';
import { getUsers } from './routes/users.js';

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

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});