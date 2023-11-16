import { Document } from "mongoose";

export enum GuestTypes {
    ADULT = 'adult',
    KIDS = 'kids',
    SENIOR = 'senior',
    PWD = 'pwd'
}

export interface GuestFee {
    adult: number;
    kids: number;
    senior: number;
    pwd: number;
}

export interface GuestFeeDocument extends GuestFee, Document {
    createdAt: Date;
    updatedAt: Date;
}