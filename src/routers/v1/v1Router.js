import express from 'express';
import postRouter from './post.js'
import userRouter from './user.js'

const router = express.Router();


router.use('/post',postRouter);
router.use('/user',userRouter)



export default router;
