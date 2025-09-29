import prisma from "../db.js";

export async function getAuthors(req, res) {
    try {
        const authors = await prisma.author.findMany({
            include: { books: true }
        });
        res.status(200).json(authors);
        console.log(authors);       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to fetch authors' });
    };
};

export async function createAuthor(req, res) {
    try {
        const { name, bio } = req.body;
        if (!name || !bio) return res.status(400).json({ error: 'Name and bio are required'});
        
        const newAuthor = await prisma.author.create({
            data: { name, bio }
        });

        res.status(201).json(newAuthor);        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to create author' });
    };   
};

export async function updateAuthor(req, res) {
    try {
        const { id } = req.params;
        const { name, bio } = req.body;
        if (!name || !bio) return res.status(400).json({ error: 'Name and bio are required'});

        const updatedAuthor = await prisma.author.update({
            where: { id: parseInt(id) },
            data: { name, bio }
        });

        res.status(200).json(updatedAuthor);        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to update author' });
    };
}; 

export async function deleteAuthor(req, res) {
    try {
        const { id } = req.params;

        const authorExists = await prisma.author.findUnique({
            where: { id: parseInt(id) }
        });
        if (!authorExists) return res.status(404).json({ error: 'Author not found, confirm Id is correct and try again' }); 

        await prisma.author.delete({
            where: { id: parseInt(id) }
        });
    

        res.status(200).json({ message: 'Author deleted successfully' });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to delete author' });
    };
};