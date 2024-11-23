import express from 'express';
import { signin, signup } from '../../controllers/userController.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodSignupSchema } from '../../Validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../Validators/zonSigninSchema.js';

const router = express.Router();

/**
 * @swagger
 * api/v1/user/signup:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's unique username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *             example:
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: StrongPassword123
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *       400:
 *         description: Validation error or bad request.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * api/v1/user/signin:
 *   post:
 *     summary: Log in a user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *             example:
 *               email: johndoe@example.com
 *               password: StrongPassword123
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error or bad request.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

export default router;
