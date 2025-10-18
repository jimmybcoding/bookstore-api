import prisma from '../db.js';

export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            include: { books: true }
        })
        res.json(users);
        console.log(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to fetch users' });
    };
};

export async function createUser(req, res) {
    try {
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).json({ error: 'Name and email are required'});

        const newUser = await prisma.user.create({
            data: { name, email },
            include: { books: true }
        }); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to create user' });
    };
};

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).json({ error: 'Name and email are required'});

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email },
            include: { books: true }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to update user' });
    };
};

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to delete user' });
    };
};

// User buys a book
export async function addBookToUser(req, res) {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) return res.status(400).json({ error: 'userId and bookId are required'});

        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!userExists) return res.status(404).json({ error: 'User not found, confirm Id is correct and try again' });

        const bookExists = await prisma.book.findUnique({
            where: { id: bookId }
        });
        if (!bookExists) return res.status(404).json({ error: 'Book not found, confirm Id is correct and try again' });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { books: { connect: { id: bookId } } },
            include: { books: true }
        });

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to add book to user' });
    };
};

// User returns a book
export async function removeBookFromUser(req, res) {
    try {
        const { userId, bookId } = req.params;
        if (!userId || !bookId) return res.status(400).json({ error: 'userId and bookId are required'});

        const userExists = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!userExists) return res.status(404).json({ error: 'User not found, confirm Id is correct and try again' }); 

        const bookExists = await prisma.book.findUnique({
            where: { id: parseInt(bookId) }
        });
        if (!bookExists) return res.status(404).json({ error: 'Book not found, confirm Id is correct and try again' });

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { books: { disconnect: { id: parseInt(bookId) } } },
            include: { books: true }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to remove book from user' });
    };
};   