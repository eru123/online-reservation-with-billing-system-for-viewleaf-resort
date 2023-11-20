import { id } from '../../utilities/ids';
import { ReservationDocument, ReservationStatus } from './reservation.types';
import { Schema, model } from 'mongoose';

const reservationSchema = new Schema(
    {
        reservationId: {
            type: String,
            unique: true,
            default: id
        },
        customer: {
            type: {
                name: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    required: true
                }
            },
            required: true
        },
        schedule: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: {
                values: Object.values(ReservationStatus),
                message: '{VALUE} is not a valid status'
            },
            default: 'pending'
        },
        notes: [
            {
                status: {
                    type: String,
                    enum: {
                        values: Object.values(ReservationStatus),
                        message: '{VALUE} is not a valid status'
                    },
                    required: true
                },
                note: {
                    type: String,
                    required: true
                }
            }
        ],
        invoices: [
            {
                accommodation: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Accommodation'
                    }
                ],
                guests: {
                    type: {
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
                    },
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const { _id, customer, notes, invoices, ...rest } = ret;
                const { _id: id, ...rest1 } = customer;

                return {
                    ...rest,
                    customer: rest1,
                    notes: notes.map(({ _id, ...rest }: Record<string, unknown>) => rest),
                    invoices: invoices.map(({ _id, guests, ...rest }: Record<string, unknown>) => {
                        const { _id: id, ...rest1 } = guests as Record<string, unknown>;
                        return { ...rest, guests: rest1 };
                    })
                };
            }
        }
    }
);

export default model<ReservationDocument>('Reservation', reservationSchema);
