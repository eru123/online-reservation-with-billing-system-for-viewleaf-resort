import { Schema, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { AccommodationDocument, AccommodationType } from './accommodation.types';

const accommodationSchema = new Schema(
    {
        accommodationId: {
            type: String,
            unique: true,
            default: id
        },
        description: {
            type: String,
            required: true
        },
        rate: {
            type: [Number],
            required: true
        },
        pax: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: {
                values: Object.values(AccommodationType),
                message: '{VALUE} is not supported'
            },
            required: true
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
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const { _id, inclusions, ...rest } = ret;
                return {
                    ...rest,
                    inclusions: inclusions.map(({ _id, ...rest }: Record<string, unknown>) => rest)
                };
            }
        }
    }
);

export default model<AccommodationDocument>('Accommodation', accommodationSchema);
