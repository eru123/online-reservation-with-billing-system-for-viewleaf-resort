import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { CreateStaff, Role } from './staff.types';
import { Login } from '../auth/auth.types';
import { password } from '../../utilities/ids';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import StaffModel from './staff.model';

export const createStaff: RequestHandler = async (req: BodyRequest<CreateStaff>, res) => {
    const { username, email } = req.body;
    
    const checker = new CheckData();
    checker.checkType(username, 'string', 'username');
    checker.checkType(email, 'string', 'email');
    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const credentials = { email, password: password() }
    await StaffModel.create({
        username,
        credentials,
        role: Role.STAFF
    });

    res.status(201).json(credentials);
}

export const login: RequestHandler = async (req: BodyRequest<Login>, res) => {
    const { email, password } = req.body;

    const checker = new CheckData();
    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const staff = await StaffModel.findOne({ 'credentials.email': email }).exec();
    if (!staff || !password || !compareSync(password, staff.credentials.password)) throw new Unauthorized();

    const payload = { staffId: staff.staffId, role: staff.role };

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json(staff.toJSON());
};

export const logout: RequestHandler = async (_req, res) =>
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);
