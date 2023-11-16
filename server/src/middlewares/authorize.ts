import { Forbidden, Unauthorized } from '../utilities/errors';
import { RequestHandler } from 'express';
import { Role } from '../api/staff/staff.types';

export const limitUsers =
    (...roles: Role[]): RequestHandler =>
    (req, _res, next) => {
        if (!req.staff) return next(new Unauthorized());
        if (!roles.includes(req.staff.role)) return next(new Forbidden());

        next();
    };
