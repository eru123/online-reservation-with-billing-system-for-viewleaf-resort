import { Document, Types } from "mongoose";
import { Inclusion, Shift } from "../accommodation/accommodation.types";
import { ReservationDocument } from "../reservation/reservation.types";

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
    accommodation: {
        accommodationId: string;
        shift: Shift;
        rate: number;
    };
    inclusions: Inclusion[];
    guests: Guest[];
}

export interface InvoiceDocument extends Invoice, Document {
    reservation: ReservationDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}