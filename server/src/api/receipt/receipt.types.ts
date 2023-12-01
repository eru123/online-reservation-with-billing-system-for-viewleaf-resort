import { Document, Types } from "mongoose";
import { ReservationDocument } from "../reservation/reservation.types"

export interface Receipt {
    receiptId: string;
    reservation: Types.ObjectId | Record<string, unknown>;
    image: string;
}

export interface ReceiptDocument extends Receipt, Document {
    reservation: ReservationDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReceiptPopulatedDocument extends ReceiptDocument {
    reservation: ReservationDocument;
}

/* REQUESTS */


