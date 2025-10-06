import { Router } from 'express';
import { signupForm, signinForm, signup, signin, logout } from '../controllers/user.controller.mjs';

const router = Router();

router.get('/signup', signupForm);

router.get('/signin', signinForm);

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/logout', logout);

export default router;