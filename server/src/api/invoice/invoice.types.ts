import { Document, Types } from "mongoose";
import { Fee, Shift } from "../accommodation/accommodation.types";
import { ReservationDocument, ReservationStatus } from "../reservation/reservation.types";

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
    accommodationId: string;
    shift: Shift;
    rate: number;
    guestFee: {
        adult: number;
        kids: number;
    };
    inclusions: {
        name: string;
        quantity: number;
        price: number;
    }[];
    guests: {
        adult: number;
        kids: number;
        senior: number;
        pwd: number;
    },
    total: number;
    minimum: number;
}

export interface InvoiceDocument extends Invoice, Document {
    reservation: ReservationDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface InvoicePopulatedDocument extends InvoiceDocument {
    reservation: ReservationDocument;
}

/* REQUESTS */

export type GetInvoices = {
    reservationId?: string;
    status?: ReservationStatus;
};
