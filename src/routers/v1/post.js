import express from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getAllPostInPaginatedForm,
  updatePostController,
} from '../../controllers/postController.js';

import upload from '../../config/multerConfig.js';

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPostInPaginatedForm);
router.put('/:id', upload.single('image'), updatePostController);
router.delete('/:id', deletePost);

export default router;
