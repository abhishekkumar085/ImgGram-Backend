import express from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getAllPostInPaginatedForm,
  updatePostController,
} from '../../controllers/postController.js';

import upload from '../../config/multerConfig.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodPostSchema } from '../../Validators/zodPostSchema.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     tags: [Post]
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     tags: [Post]
 *     summary: Retrieve all posts in paginated form
 *     responses:
 *       200:
 *         description: A list of posts
 *       404:
 *         description: No posts found
 */

/**
 * @swagger
 * /api/v1/post/{id}:
 *   put:
 *     tags: [Post]
 *     summary: Update a post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/v1/post/{id}:
 *   delete:
 *     tags: [Post]
 *     summary: Delete a post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post(
  '/',
  isAuthenticated,
  upload.single('image'),
  validate(zodPostSchema),
  createPost
);

router.get('/', isAuthenticated, getAllPostInPaginatedForm);

router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  upload.single('image'),
  updatePostController
);

router.delete('/:id', isAuthenticated, deletePost);

export default router;
