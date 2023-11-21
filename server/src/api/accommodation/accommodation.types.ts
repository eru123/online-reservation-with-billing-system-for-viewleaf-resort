import { Document } from "mongoose";

export enum Shift {
    DAY = 'day',
    NIGHT = 'night',
    WHOLE = 'whole day'
}

export enum AccommodationType {
    ROOM = 'room',
    COTTAGE = 'cottage',
    RESORT = 'resort'
}

export interface Inclusion {
    accommodationId: string;
    name: string;
    price: number;
}

export interface Fee {
    shift: Shift;
    rate: number;
    guestFee: {
        adult: number;
        kids: number;
    }
}

export interface Accommodation {
    accommodataionId: string;
    description: string;
    pax: string;
    image: string;
    fees: Fee[];
    type: AccommodationType;
    inclusions: Inclusion[];
}

export interface AccommodationDocument extends Accommodation, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* REQUESTS */

export type AddShift = {
    accommodationId: string;
    shift: Shift;
    rate: number;
    adultFee: number;
    kidsFee: number;
}

export type UpdateShiftFees = {
    accommodationId: string;
    shift: Shift;
    rate?: number;
    adultFee?: number;
    kidsFee?: number;
}

export type CreateAccommodation = {
    description: string;
    pax: string;
    image: string;
    type: AccommodationType;
    fees: Omit<AddShift, 'accommodationId'>[];
}

export type UpdateAccommodation = {
    accommodationId: string;
    description?: string;
    pax?: string;
    image?: string;
    type?: AccommodationType;
}

export type GetAccommodation = {
    accommodationId: string;
    schedule: number;
    shift: Shift;
}

/* HELPERS */

export type CombinedInvoiceAccommodation = {
    accommodationId: string;
    fees: Fee[];
}