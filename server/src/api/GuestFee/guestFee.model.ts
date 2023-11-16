import { Schema, model } from "mongoose";
import { GuestFeeDocument } from "./guestFee.types";

const guestFeeSchema = new Schema({
    adult: {
        type: Number,
        required: true
    },
    kids: {
        type: Number,
        required: true
    },
    senior: {
        type: Number,
        required: true
    },
    pwd: {
        type: Number,
        required: true
    }
});

export default model<GuestFeeDocument>('GuestFee', guestFeeSchema);