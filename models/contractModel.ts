import { Schema, model } from 'mongoose';

const contractSchema = new Schema({
    LenderId: {
        type: Schema.Types.ObjectId,
        ref: 'lender'
    },
    BorrowerId: {
        type: Schema.Types.ObjectId,
        ref: 'borrower'
    },
    Principle:{
        type:Number,
        required:true
    },
    Interest:{
        type:Number,
        required:true
        
    },
    LoanStartDate:{
        type:Date,
        min: "1900-09-28",
        max: "2023-05-23",
    },
    LoanDueDate:{
        type:Date,
        min: "1900-09-28",
        max: "2023-05-23",
    },
    IsRepaid:{
        type:Boolean,
        required:true
    }
    
})

export const contract = model('contract', contractSchema);