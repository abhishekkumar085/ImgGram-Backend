import express from 'express';
import { signin, signup } from '../../controllers/userController.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodSignupSchema } from '../../Validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../Validators/zonSigninSchema.js';
const router = express.Router();

router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

export default router;
