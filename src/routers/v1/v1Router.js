import express from 'express';
import postRouter from './post.js'

const router = express.Router();


router.use('/post',postRouter);




export default router;
