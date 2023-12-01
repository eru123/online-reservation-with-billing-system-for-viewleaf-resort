import { Document } from 'mongoose';
import { Shift } from '../accommodation/accommodation.types';

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

/* REQUESTS */

type ReserveAccommodation = {
    accommodationId: string;
    shift: Shift;
    guests: {
        adult: number;
        kids: number;
        senior: number;
        pwd: number;
    };
    inclusions: {
        name: string;
        quantity: number;
    }[];
};

export type CreateReservation = {
    name: string;
    phone: string;
    email: string;
    schedule: number;
    accommodations: ReserveAccommodation[];
};

export type GetReservations = {
    reservationId?: string;
    status?: ReservationStatus;
};

export type AddExtras = {
    reservationId: string;
    accommodations: ReserveAccommodation[];
};

export type UpdateStatus = {
    reservationId: string;
    status: ReservationStatus;
    note: string;
}

export type PayReservation = {
    reservationId: string;
    receipt: string;
}
