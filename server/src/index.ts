import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Middlewares
import errorHandler from './middlewares/errorHandler';

// Utilities
import { NotFound } from './utilities/errors';
import { Role } from './api/staff/staff.types';
import envs from './utilities/envs';
import StaffModel from './api/staff/staff.model';

// Routes
import faqRoute from './api/faq/faq.route';
import contentRoute from './api/content/content.route';
import staffRoute from './api/staff/staff.route';

// Environment Variables
const { PORT, MONGO_URI, CORS_ORIGIN, USERNAME, PASSWORD, EMAIL } = envs;

const app = express();

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/faqs', faqRoute);
app.use('/contents', contentRoute);
app.use('/staff', staffRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => StaffModel.findOne({ role: Role.ADMIN }).exec())
    .then((admin) =>
        admin
            ? admin
            : StaffModel.create({
                  username: USERNAME,
                  credentials: {
                      email: EMAIL,
                      password: PASSWORD
                  },
                  role: Role.ADMIN
              })
    )
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);

