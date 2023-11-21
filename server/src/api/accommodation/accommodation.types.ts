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