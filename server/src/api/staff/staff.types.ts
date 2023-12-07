import { Document } from "mongoose";

export enum Role {
    ADMIN = 'admin',
    STAFF = 'staff',
}

export interface Staff {
    staffId: string;
    username: string;
    contact?: string;
    credentials: {
        email: string;
        password: string;
    };
    role: Role;
}

export interface StaffDocument extends Staff, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* REQUESTS */

export type CreateStaff = {
    username: string;
    email: string;
}

export type GetStaff = {
    staffId?: string;
}

export type UpdateStaff = {
    username: string;
    email: string;
    contact?: string;
    password?: string;
}