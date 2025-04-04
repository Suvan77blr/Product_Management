import  express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../Controllers/userController.js';

const userRouter=express.Router();

userRouter.get("/",getUsers);
userRouter.post("/",createUser);
userRouter.delete("/:id",deleteUser);
userRouter.put("/:id",updateUser);

export default userRouter;