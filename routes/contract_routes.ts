import { getContract, createContract } from './../controllers/contractController';
import { Router } from "express";

export const contractRoute = Router();

// routes for getting and creating contracts

contractRoute.post('/', createContract);
contractRoute.get('/', getContract);