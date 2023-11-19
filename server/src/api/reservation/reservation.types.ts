import { Document } from "mongoose";

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
}

export interface ReservationDocument extends Reservation, Document {
    createdAt: Date;
    updatedAt: Date;
}
