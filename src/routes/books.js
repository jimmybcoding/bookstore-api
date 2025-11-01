import prisma from '../db.js';

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Get a list of all the books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: No books found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error, failed to fetch authors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book' 
 */
export async function getBooks(req, res) {
    try {
        const books = await prisma.book.findMany({
            include: { author: true }
        });
        if (books.length === 0) return res.status(404).json({ error: 'No books found' });

        res.status(200).json(books);
        console.log(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    };
};

/** 
 * @openapi
 * /books/random:
 *   get:
 *     summary: Get a random book
 *     description: Get a random book returned
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A random book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No books found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to fetch book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'  
 */

export async function getRandomBook(req, res) {
  try {
    const books = await prisma.book.findMany({
      include: { author: true }
    });
    if (books.length === 0) return res.status(404).json({ error: 'No books found' });

    const randomBook = books[Math.floor(Math.random() * books.length)];
    res.status(200).json(randomBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, failed to fetch book' });
  }
}

/**  
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with title, published date, isbn, price, pic, and authorId
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Title, published date, isbn, price, pic, and authorId are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Author not found, confirm Id is correct and try again
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to create book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'    
 */ 
  
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
                author: { connect: { id: authorId } } },
            include: { author: true }
        });
        
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to create book' });
    };
};

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Update a book's information by its ID
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Title, published date, isbn, price, pic, and authorId are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Author not found, confirm Id is correct and try again
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to update book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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
                author: { connect: { id: authorId } } },
            include: { author: true }
        });
        
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, failed to update book' });
    };
};

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     description: Delete a book by ID
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to delete book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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