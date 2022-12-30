import { Request, RequestParamHandler, Response } from 'express';
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

//interface for results
interface resultI {
    LenderId: string | undefined,
    Total: number,
    borrowerCount: number
}

interface finalResultI {
    LenderName: string | undefined,
    Total: number,
}

interface recordsResultI {
    LenderName: string | undefined,
    Total: number,
}

const checkAvailable = (lenderId: string | undefined, result: resultI[]) => {
    let value: boolean = true;
    result.forEach((ele) => {
        if (ele.LenderId == lenderId) {
            value = false;
        } else {
            value = true;
        }
    })

    return value;

}

//geting query params and evaluating
export const getContract = async (req: Request, res: Response) => {
    try {

        // requesting contract as per query
        let { borrower, records, sort }: any = req.query;
        let data = await contract.find();
        if (borrower) {
            let result: resultI[] = []

            data.forEach((ele, index) => {
                let lenderId = ele.LenderId?.toString();
                let checkValue: boolean = checkAvailable(lenderId, result);
                if (checkValue) {
                    result.push({ LenderId: lenderId, Total: ele.Principle, borrowerCount: 1 });

                } else {
                    for (let i = index; i < data.length; i++) {
                        if (data[i].LenderId?.toString() == lenderId) {
                            result.forEach((resEle) => {
                                if (resEle.LenderId == lenderId) {
                                    resEle.Total += ele.Principle;
                                    resEle.borrowerCount += 1;
                                }
                            })
                        }
                    }
                }
            })
            let finalResult: finalResultI[] = []

            result.forEach(async (ele, index) => {
                try {
                    if (ele.borrowerCount >= parseInt(borrower)) {
                        let lenderData = await lender.findOne({ _id: ele.LenderId })
                        finalResult.push({ LenderName: lenderData?.Name, Total: ele.Total });
                        if (index == result.length - 1) {
                            return res.send({
                                response: "success",
                                data: finalResult
                            })
                        }
                    }

                } catch (error) {
                    console.log(error)
                }

            })

        } else if (sort) {
            let result: resultI[] = []

            data.forEach((ele, index) => {
                let lenderId = ele.LenderId?.toString();
                let checkValue: boolean = checkAvailable(lenderId, result);
                if (checkValue) {
                    result.push({ LenderId: lenderId, Total: ele.Principle, borrowerCount: 1 });

                } else {
                    for (let i = index; i < data.length; i++) {
                        if (data[i].LenderId?.toString() == lenderId) {
                            result.forEach((resEle) => {
                                if (resEle.LenderId == lenderId) {
                                    resEle.Total += ele.Principle;
                                    resEle.borrowerCount += 1;
                                }
                            })
                        }
                    }
                }
            })
            let finalResult: recordsResultI[] = []

            result.forEach(async (ele, index) => {
                try {
                    let lenderData = await lender.findOne({ _id: ele.LenderId })
                    finalResult.push({ LenderName: lenderData?.Name, Total: ele.borrowerCount });

                    finalResult.sort((a, b) => {
                        return a.Total - b.Total;
                    })




                    if (index == result.length - 1) {
                        return res.send({
                            response: "success",
                            data: finalResult
                        })
                    }







                } catch (error) {
                    console.log(error)
                }

            })
        }


    } catch (error) {
        return res.status(404).send({
            response: "error",
            message: "something wrong happen"
        })

    }
}


