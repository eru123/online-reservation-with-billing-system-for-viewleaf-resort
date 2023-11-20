import { Document } from "mongoose";

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

export interface Accommodation {
    accommodationId: string;
    description: string;
    rate: number[];
    pax: number;
    image: string;
    type: AccommodationType;
    inclusions: Inclusion[];
}

export interface AccommodationDocument extends Accommodation, Document {
    createdAt: Date;
    updatedAt: Date;
}