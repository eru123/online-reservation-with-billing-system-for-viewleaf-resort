import { AccommodationAvailbility, AccommodationDocument, AccommodationType, Shift } from './accommodation.types';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';

const generatedId = id();

const accommodationSchema = new Schema(
    {
        accommodationId: {
            type: String,
            unique: true,
            default: generatedId
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pax: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        fees: [
            {
                shift: {
                    type: String,
                    enum: {
                        values: Object.values(Shift),
                        message: '{VALUE} is not supported'
                    },
                    required: true
                },
                rate: {
                    type: String,
                    required: true
                },
                guestFee: {
                    type: {
                        adult: {
                            type: Number,
                            required: true
                        },
                        kids: {
                            type: Number,
                            required: true
                        }
                    },
                    required: true
                }
            }
        ],
        type: {
            type: String,
            enum: {
                values: Object.values(AccommodationType),
                message: '{VALUE} is not supported'
            },
            required: true
        },
        availability: {
            type: String,
            enum: {
                values: Object.values(AccommodationAvailbility),
                message: '{VALUE} is not supported'
            },
            default: AccommodationAvailbility.AVAILABLE,    
        },
        inclusions: [
            {
                accommodationId: {
                    type: String,
                    required: true,
                    default: generatedId
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

export default model<AccommodationDocument>('Accommodation', accommodationSchema);
