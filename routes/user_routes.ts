import { getUsers,createUser, getAll } from './../controllers/userController';
import { Router } from "express";

export const userRoute=Router();

// route for getting all user data
userRoute.get('/',getAll);

// routes for  geting and creating lender users
userRoute.post('/lender',createUser);
userRoute.get('/lenders',getUsers);

// routes for getting and creating borrower users
userRoute.get('/borrowers',getUsers);
userRoute.post('/borrower',createUser);
