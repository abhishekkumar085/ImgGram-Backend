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

router.post(
  '/',
  isAuthenticated,
  upload.single('image'),
  validate(zodPostSchema),
  createPost
);
router.get('/', getAllPostInPaginatedForm);
router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  upload.single('image'),
  updatePostController
);
router.delete('/:id', isAuthenticated, deletePost);

export default router;
