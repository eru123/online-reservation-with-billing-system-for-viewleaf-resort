import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { FeedbackDocument } from './feedback.types';

const feedbackSchema = new Schema(
    {
        feedbackId: {
            type: String,
            unique: true,
            default: id
        },
        reservation: {
            type: Types.ObjectId,
            ref: 'Reservation',
            required: true
        },
        rating: {
            type: Number,
            min: [0, 'Rating must be between 0 and 5'],
            max: [5, 'Rating must be between 0 and 5'],
            required: true
        },
        review: String
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

export default model<FeedbackDocument>('Feedback', feedbackSchema);
