import express from 'express';
import postRouter from './post.js'
import userRouter from './user.js'
import commentRouter from './comment.js'

const router = express.Router();


router.use('/post',postRouter);
router.use('/user',userRouter)

router.use('/comments',commentRouter)



export default router;
