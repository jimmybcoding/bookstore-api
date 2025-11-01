import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Admin login and receive JWT token
 *     description: Admin account can login in with email and password and get JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Email and password are required or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No user found with that email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error, failed to login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Name and email are required" });

    const lookupUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!lookupUser)
      return res
        .status(404)
        .json({ error: "No user found with that email, please try again." });
    const correctPassword = await bcrypt.compare(password, lookupUser.password);
    if (!correctPassword)
      return res
        .status(400)
        .json({
          error: "Password is incorrect for this email, please try again.",
        });

    const payload = {
      id: lookupUser.id,
      email: lookupUser.email,
      isAdmin: lookupUser.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login Successful",
      user: payload,
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error, failed to login, please try again." });
  }
}
