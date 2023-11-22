import { Schema, Types, model } from 'mongoose';
import { ReceiptDocument } from './receipt.types';
import { id } from '../../utilities/ids';

const receiptSchema = new Schema(
    {
        receiptId: {
            type: String,
            unique: true,
            default: id
        },
        reservation: {
            type: Types.ObjectId,
            ref: 'Reservation',
            required: true
        },
        invoices: [
            {
                type: Types.ObjectId,
                ref: 'Invoice'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const { _id, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<ReceiptDocument>('Receipt', receiptSchema);
