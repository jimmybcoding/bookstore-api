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
            data: { name, email }
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
            data: { name, email }
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