import { Role } from "../staff/staff.types";

export interface Payload {
    staffId: string;
    role: Role;
}

export type Login = {
    email: string;
    password: string;
}