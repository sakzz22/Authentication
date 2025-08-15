import express , {Router} from 'express';
import { login, signUp } from '../controllers/auth.js';

const authRouter = express(Router());

authRouter.post("/signup" , signUp);
authRouter.post("/login" , login);

export default authRouter;