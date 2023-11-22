import { Document, Types } from "mongoose";
import { Fee, Inclusion } from "../accommodation/accommodation.types";
import { ReservationDocument } from "../reservation/reservation.types";

export interface InvoiceAccommodation {
    accommodationId: string;
    fee: Fee;
}

export interface Guest {
    accommodationId: string;
    adult: number;
    kids: number;
    senior: number;
    pwd: number;
}

export interface Invoice {
    invoiceId: string;
    reservation: Types.ObjectId | Record<string, unknown>;
    accommodation: InvoiceAccommodation;
    inclusions: Inclusion[];
    guests: Guest[];
}

export interface InvoiceDocument extends Invoice, Document {
    reservation: ReservationDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

/* HELPERS */
