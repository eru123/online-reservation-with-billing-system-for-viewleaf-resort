import { Document, Types } from "mongoose";
import { ReservationDocument } from "../reservation/reservation.types"
import { InvoiceDocument } from "../invoice/invoice.types";

export interface Receipt {
    receiptId: string;
    reservation: Types.ObjectId | Record<string, unknown>;
    invoices: [Types.ObjectId | Record<string, unknown>];
}

export interface ReceiptDocument extends Receipt, Document {
    reservation: ReservationDocument['_id'];
    invoices: [InvoiceDocument['_id']];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReceiptPopulatedDocument extends ReceiptDocument {
    reservation: ReservationDocument;
    invoices: [InvoiceDocument];
}