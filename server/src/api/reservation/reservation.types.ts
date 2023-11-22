import { Document } from "mongoose";

export enum ReservationStatus {
    CANCELLING = 'cancelling',
    PENDING = 'pending',
    REFUNDING = 'refunding',
    RESCHEDULING = 'rescheduling',

    APPROVED = 'approved',
    CANCELLED = 'cancelled',
    DECLINED = 'declined',
    PAID = 'paid',
    REFUNDED = 'refunded',
    VERIFIED = 'verified',

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
