import { Request, Response } from 'express';
import { lender, borrower } from "../models/userModel";
import { contract } from '../models/contractModel';


export const createContract = async (req: Request, res: Response) => {
    try {
        // adding contract in the database
        let { LenderName, BorrowerName, Principle, Interest, LoanStartDate, LoanDueDate, IsRepaid } = req.body;

        const Lender = await lender.findOne({ Name: LenderName });
        const LenderId = Lender?._id;
        const Borrower = await borrower.findOne({ Name: BorrowerName });
        const BorrowerId = Borrower?._id;
        const data = await contract.create({
            LenderId,
            BorrowerId,
            Principle,
            Interest,
            LoanStartDate,
            LoanDueDate,
            IsRepaid
        })
        return res.send({
            response: "success",
            message: "contract created successfully",
            data
        })


    } catch (error) {
        return res.status(404).send({
            response: "error",
            message: "something wrong happen"
        })

    }



}

interface resultI {
    LenderName: string | undefined,
    Total: number,
    borrowerCount: number
}


export const getContract = async (req: Request, res: Response) => {
    try {

        // requesting contract as per query

        let n = req.query.n;
        console.log(n)
        let data = await contract.find();
        let result: resultI[] = []
        let resl = data.forEach(async (ele, index) => {
            let lenderId = ele.LenderId?.toString();
            let lenderData = await lender.findOne({ _id: lenderId });
            let lenderName = lenderData?.Name;
            let checkValue: boolean = checkAvailable(lenderName, result);
            if (checkValue) {
                result.push({ LenderName: lenderName, Total: ele.Principle, borrowerCount: 1 });
                for (let i = index + 1; i < data.length; i++) {
                    if (data[i].LenderId?.toString() == lenderId) {
                        result.forEach((resEle) => {
                            if (resEle.LenderName == lenderName) {
                                resEle.Total = resEle.Total + ele.Principle;
                                resEle.borrowerCount += 1;
                            }
                        })
                    }
                }

            } else {
                result.forEach((resEle) => {
                    if (resEle.LenderName == lenderName) {
                        resEle.Total += ele.Principle;
                        resEle.borrowerCount += 1;
                    }
                })


            }

        })
        const checkAvailable = (lenderName: string | undefined, result: resultI[]) => {
            let value: boolean = true;
            result.forEach((ele) => {
                if (ele.LenderName == lenderName) {
                    // console.log(ele.LenderName,lenderName)
                    value = false;
                } else {
                    value = true;
                }
            })

            return value;
        }


    } catch (error) {
        return res.status(404).send({
            response: "error",
            message: "something wrong happen"
        })

    }
}


