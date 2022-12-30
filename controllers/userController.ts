import { Request, Response } from 'express';
import { lender, borrower } from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    let { Name, Email, MobileNumber } = req.body;

        // for posting user data in lender

    if (req.url == '/lender') {
        const user = await lender.findOne({ Name, Email });
        if (user) {
            return res.status(404).send({
                response: "error",
                message: "lender already exist"
            })
        }

        await lender.create({
            Name,
            Email,
            MobileNumber
        })

        return res.send({
            response: "success",
            message: "lender created successfully"
        })

    }
        // for posting user data in borrower 
    
    else if (req.url == "/borrower") {

        const user = await borrower.findOne({ Name, Email });
        if (user) {
            return res.status(404).send({
                response: "error",
                message: "borrower already exist"
            })
        }

        await borrower.create({
            Name,
            Email,
            MobileNumber
        })

        return res.send({
            response: "success",
            message: "borrower created successfully"
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {

    try {

        // get all lenders users

        if (req.url == '/lenders') {
            const data = await lender.find();
            return res.send({
                response: "success",
                data
            })

        }
        // getting all borrower users
        else if (req.url == "/borrowers") {
            const data = await borrower.find();
            return res.send({
                response: "success",
                data
            })


        }

    } catch (error) {
        return res.status(404).send({
            response: "error",
            message: "something wrong happen"
        })

    }

}

export const getAll = async (req: Request, res: Response) => {
    try {

        // getting all users of lenders and borrowers
        const lenders = await lender.find();
        const borrowers = await borrower.find();

        return res.send({
            response: "success",
            lenders,
            borrowers
        })

    } catch (error) {
        return res.status(404).send({
            response: "error",
            message: "something wrong happen"
        })
    }
}