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
        res.status(500).json({ error: 'Failed to fetch users' });
    };
};
