import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Payload } from '../api/auth/auth.types';
import { RequestHandler } from 'express';
import { Unauthorized } from '../utilities/errors';
import envs from '../utilities/envs';
import staffModel from '../api/staff/staff.model';

const refreshTime = 5 * 24 * 60 * 60 * 1000; // 5 days

const authenticate: RequestHandler = async (req, res, next) => {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } = req.cookies;

    if (!refreshToken) return next(new Unauthorized('This action requires logging in first'));

    let payload: Payload | undefined;

    try {
        payload = verify(accessToken, envs.JWT_ACCESS) as Payload;
    } catch (err) {}

    if (!payload) {
        try {
            const { staffId, role, exp = new Date() } = verify(refreshToken, envs.JWT_REFRESH) as JwtPayload & Payload;
            payload = { staffId, role };

            res.cookie('access-token', signAccess(payload), cookieOptions.access);

            if (Date.now() - new Date(exp).getTime() > refreshTime)
                res.cookie('refresh-token', signRefresh(payload), cookieOptions.refresh);
        } catch (err) {
            res.cookie('access-token', '', cookieOptions.default).cookie('refresh-token', '', cookieOptions.default);
            return next(err);
        }
    }

    if (payload) {
        const staff = await staffModel.findOne({ staffId: payload.staffId, role: payload.role });
        if (!staff) throw new Unauthorized('Invalid credentials');

        req.staff = staff;
        return next();
    }

    next(new Unauthorized('This action requires logging in first'));
};

export default authenticate;
