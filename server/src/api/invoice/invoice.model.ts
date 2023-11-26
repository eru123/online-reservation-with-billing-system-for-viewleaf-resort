import { id } from '../../utilities/ids';
import { InvoiceDocument } from './invoice.types';
import { Schema, Types, model } from 'mongoose';
import { Shift } from '../accommodation/accommodation.types';

const invoiceSchema = new Schema(
    {
        invoiceId: {
            type: String,
            unique: true,
            default: id
        },
        reservation: {
            type: Types.ObjectId,
            ref: 'Reseration',
            required: true
        },
        accommodation: {
            accommodationId: {
                type: String,
                required: true
            },
            shift: {
                type: String,
                enum: {
                    values: Object.values(Shift),
                    message: '{VALUE} is not supported'
                },
                required: true
            },
            rate: {
                type: Number,
                required: true
            }
        },
        inclusions: [
            {
                accommodationId: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        guests: [
            {
                accommodationId: {
                    type: String,
                    required: true
                },
                adult: {
                    type: Number,
                    requried: true
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
                    requried: true
                }
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

export default model<InvoiceDocument>('Invoice', invoiceSchema);
