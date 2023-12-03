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
            ref: 'Reservation',
            required: true
        },
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
        },
        guestFee: {
            adult: {
                type: Number,
                required: true
            },
            kids: {
                type: Number,
                required: true
            }
        },
        inclusions: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        guests: {
            adult: {
                type: Number,
                default: 0
            },
            kids: {
                type: Number,
                default: 0
            },
            senior: {
                type: Number,
                default: 0
            },
            pwd: {
                type: Number,
                default: 0
            }
        }
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
