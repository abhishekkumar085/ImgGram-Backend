import express from 'express';
import { signup } from '../../controllers/userController.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodSignupSchema } from '../../Validators/zodSignupSchema.js';
const router = express.Router();

router.post('/signup', validate(zodSignupSchema), signup);

export default router;