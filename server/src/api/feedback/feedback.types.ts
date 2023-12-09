import { Document, Types } from "mongoose";
import { ReservationDocument } from "../reservation/reservation.types";

export interface Feedback {
    feedback: string;
    reservation: Types.ObjectId | Record<string, unknown>;
    rating: number;
    review?: string;
}

export interface FeedbackDocument extends Feedback, Document {
    reservation: ReservationDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface FeedbackPopulatedDocument extends FeedbackDocument {
    reservation: ReservationDocument;
}

/* REQEUSTS */

export interface CreateFeedback {
    reservationId: string;
    rating: number;
    review?: string;
}
