import prisma from "../db.js";

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get a list of all authors
 *     description: Get a list of authors with their books
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to fetch authors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function getAuthors(req, res) {
  try {
    const authors = await prisma.author.findMany({
      include: { books: true },
    });
    res.status(200).json(authors);
    console.log(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to fetch authors" });
  }
}

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Create a new author with name and bio
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Name and bio are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to create author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function createAuthor(req, res) {
  try {
    const { name, bio } = req.body;
    if (!name || !bio)
      return res.status(400).json({ error: "Name and bio are required" });

    const newAuthor = await prisma.author.create({
      data: { name, bio },
      include: { books: true },
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to create author" });
  }
}

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     description: Update an author's name and bio by ID
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Name and bio are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to update author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function updateAuthor(req, res) {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio)
      return res.status(400).json({ error: "Name and bio are required" });

    const updatedAuthor = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { name, bio },
      include: { books: true },
    });

    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to update author" });
  }
}

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an existing author
 *     description: Delete an author by ID
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author deleted successfully
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Cannot delete author with existing books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to delete author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;

    const authorExists = await prisma.author.findUnique({
      where: { id: parseInt(id) },
      include: { books: true },
    });
    if (!authorExists)
      return res
        .status(404)
        .json({
          error: "Author not found, confirm Id is correct and try again",
        });

    // Prevents books from being authorless
    if (authorExists.books.length > 0) {
      return res
        .status(400)
        .json({
          error:
            "Cannot delete author with existing books. Please delete the books first.",
        });
    }

    await prisma.author.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to delete author" });
  }
}
