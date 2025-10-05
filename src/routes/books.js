import prisma from '../db.js';

export async function getBooks(req, res) {
    try {
        const books = await prisma.book.findMany({
            include: { author: true }
        });
        res.status(200).json(books);
        console.log(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    };
};

export async function createBook(req, res) {
    try {
        const { title, published, isbn, price, pic, authorId } = req.body;
        if (!title || !published || !isbn || !price || !pic || !authorId) return res.status(400).json({ error: 'Title, published date, isbn, and authorId are required'});

        const authorExists = await prisma.author.findUnique({
            where: { id: authorId }
        });
        if (!authorExists) return res.status(404).json({ error: 'Author not found, confirm Id is correct and try again' });

        const newBook = await prisma.book.create({
            data: { 
                title, 
                published: new Date(published), 
                isbn,
                price,
                pic,
                author: { connect: { id: authorId } } }
        });
        
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to create book' });
    };
};

export async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const { title, published, isbn, price, pic, authorId } = req.body;
        if (!title || !published || !isbn || !price || !pic || !authorId) return res.status(400).json({ error: 'Title, published date, isbn, and authorId are required'});
        
        const authorExists = await prisma.author.findUnique({
            where: { id: authorId }
        });
        if (!authorExists) return res.status(404).json({ error: 'Author not found, confirm Id is correct and try again' });

        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: { 
                title, 
                published: new Date(published), 
                isbn,
                price,
                pic, 
                author: { connect: { id: authorId } } }
        });
        
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to update book' });
    };
};
    
export async function deleteBook(req, res) {
    try {
        const { id } = req.params;

        const bookExists = await prisma.book.findUnique({
            where: { id: parseInt(id) }
        });
        if (!bookExists) return res.status(404).json({ error: 'Book not found, confirm Id is correct and try again' });
        
        await prisma.book.delete({
            where: { id: parseInt(id) }
        });
        
        res.status(200).json({ message: 'Book deleted successfully' });     
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to delete book' });
    };
};