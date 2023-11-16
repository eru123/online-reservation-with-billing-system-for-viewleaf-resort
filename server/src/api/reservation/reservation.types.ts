import { Types } from 'mongoose';
import { AccommodationDocument } from '../accommodation/accommodation.types';

export enum ReservationStatus {
    PENDING = 'pending',
    REFUNDING = 'refunding',
    RESCHEDULING = 'rescheduling',
    CANCELLING = 'cancelling',

    APPROVED = 'approved',
    DECLINED = 'declined',
    REFUNDED = 'refunded',
    CANCELLED = 'cancelled',

    CHECKED_IN = 'checked in',
    CHECKED_OUT = 'checked out'
}

export interface Note {
    status: ReservationStatus;
    note: string;
}

export interface Reservation {
    reservationId: string;
    customer: {
        name: string;
        phone: string;
        email: string;
    };
    schedule: Date;
    status: ReservationStatus;
    notes: Note[];
    invoices: {
        accommodation: [Types.ObjectId | Record <string, unknown>];
        guests: {
            adult: number;
            kids: number;
            senior: number;
            pwd: number;
        };
        receipt: string;
    }[];
}

export interface ReservationDocument extends Reservation, Document {
    invoices: {
        accommodation: [AccommodationDocument['_id']];
        guests: {
            adult: number;
            kids: number;
            senior: number;
            pwd: number;
        };
        receipt: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReservationPopulatedDocument extends ReservationDocument {
    invoices: {
        accommodation: [AccommodationDocument];
        guests: {
            adult: number;
            kids: number;
            senior: number;
            pwd: number;
        };
        receipt: string;
    }[];
}
