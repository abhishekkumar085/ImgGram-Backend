import express from 'express';
import { createPost, getAllPost } from '../../controllers/postController.js';

import upload from '../../config/multerConfig.js';

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPost);

export default router;
