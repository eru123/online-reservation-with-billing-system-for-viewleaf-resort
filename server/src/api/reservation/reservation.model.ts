import { reservation } from '../../utilities/ids';
import { ReservationDocument, ReservationStatus } from './reservation.types';
import { Schema, Types, model } from 'mongoose';

const reservationSchema = new Schema(
    {
        reservationId: {
            type: String,
            unique: true,
            default: reservation
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
        extras: {
            type: [
                {
                    invoices: [
                        {
                            invoiceId: {
                                type: String,
                                required: true
                            },
                            guests: {
                                adult: Number,
                                kids: Number,
                                senior: Number,
                                pwd: Number
                            },
                            inclusions: [
                                {
                                    name: {
                                        type: String,
                                        required: true
                                    },
                                    quantity: {
                                        type: Number,
                                        required: true
                                    }
                                }
                            ],
                            total: Number,
                            minimum: Number
                        }
                    ],
                    date: {
                        type: Date,
                        required: true
                    }
                }
            ]
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

export default model<ReservationDocument>('Reservation', reservationSchema);
