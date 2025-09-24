import prisma from "../db.js";

export async function getAuthors(req, res) {
    try {
        const authors = await prisma.author.findMany({
            include: { books: true }
        });
        res.json(authors);
        console.log(authors);       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    };
};