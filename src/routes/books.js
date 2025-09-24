import prisma from '../db.js';

export async function getBooks(req, res) {
    try {
        const books = await prisma.book.findMany({
            include: { author: true }
        });
        res.json(books);
        console.log(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    };
};