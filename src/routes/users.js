import prisma from "../db.js";
import bcrypt from "bcryptjs";

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: Get a list of users with their books
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to fetch users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: { books: true },
    });

    if (users.length === 0)
      return res.status(404).json({ error: "No users found" });
    res.json(users);
    console.log(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to fetch users" });
  }
}

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name, email and password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Name and email are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Duplicate email used to sign up
 *         content:
 *           application/json:
 *             schema:
 *               $ref:  '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to create user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ error: "Name and email and password are required" });

    const emailExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (emailExists)
      return res
        .status(409)
        .json({
          error:
            "User found with that email, please create account using a different email.",
        });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      include: { books: true },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to create user" });
  }
}

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's name and email by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *       400:
 *         description: Name and email are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to update user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ error: "Name and email are required" });

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
      include: { books: true },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to update user" });
  }
}

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Token error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to delete user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to delete user" });
  }
}

/**
 * @openapi
 * /users/{userId}/books/{bookId}:
 *   post:
 *     summary: User buys a book
 *     description: Add a book to a user's collection
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       201:
 *         description: Book added to user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: userId and bookId are required
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
 *         description: User or Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to add book to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// User buys a book
export async function addBookToUser(req, res) {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId)
      return res.status(400).json({ error: "userId and bookId are required" });

    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!userExists)
      return res
        .status(404)
        .json({ error: "User not found, confirm Id is correct and try again" });

    const bookExists = await prisma.book.findUnique({
      where: { id: parseInt(bookId) },
    });
    if (!bookExists)
      return res
        .status(404)
        .json({ error: "Book not found, confirm Id is correct and try again" });

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { books: { connect: { id: parseInt(bookId) } } },
      include: { books: true },
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, failed to add book to user" });
  }
}

/**
 * @openapi
 * /users/{userId}/books/{bookId}:
 *   delete:
 *     summary: User returns a book
 *     description: Remove a book from a user's collection
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book removed from user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: userId and bookId are required
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
 *         description: User or Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to remove book from user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// User returns a book
export async function removeBookFromUser(req, res) {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId)
      return res.status(400).json({ error: "userId and bookId are required" });

    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!userExists)
      return res
        .status(404)
        .json({ error: "User not found, confirm Id is correct and try again" });

    const bookExists = await prisma.book.findUnique({
      where: { id: parseInt(bookId) },
    });
    if (!bookExists)
      return res
        .status(404)
        .json({ error: "Book not found, confirm Id is correct and try again" });

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { books: { disconnect: { id: parseInt(bookId) } } },
      include: { books: true },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error, failed to remove book from user" });
  }
}
