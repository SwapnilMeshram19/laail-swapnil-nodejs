import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    MobileNumber: Number,
})

export const lender = model('lender', userSchema);
export const borrower = model('borrower', userSchema);



