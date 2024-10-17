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

const router = express.Router();

router.post('/', upload.single('image'), validate(zodPostSchema), createPost);
router.get('/', getAllPostInPaginatedForm);
router.put('/:id', upload.single('image'), updatePostController);
router.delete('/:id', deletePost);

export default router;
