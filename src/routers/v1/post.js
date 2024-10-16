import express from 'express';
import { createPost, getAllPost, getAllPostInPaginatedForm } from '../../controllers/postController.js';

import upload from '../../config/multerConfig.js';

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPostInPaginatedForm);

export default router;
