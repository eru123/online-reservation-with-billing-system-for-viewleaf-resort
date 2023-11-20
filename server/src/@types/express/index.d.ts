import { StaffDocument } from '../../api/staff/staff.types';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            staff?: StaffDocument;
        }
    }
}

declare module 'express' {
    export interface BodyRequest<T> extends Request<{}, {}, T> {}
    export interface QueryRequest<T> extends Request<{}, {}, {}, T> {}
}
