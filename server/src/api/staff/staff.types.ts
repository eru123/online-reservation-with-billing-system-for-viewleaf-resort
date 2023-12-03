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

export type CreateStaff = {
    username: string;
    email: string;
}

export type GetStaff = {
    staffId?: string;
}