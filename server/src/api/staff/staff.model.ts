import { Schema, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { hashSync } from 'bcrypt';
import { Role, StaffDocument } from './staff.types';

const staffSchema = new Schema(
    {
        staffId: {
            type: String,
            unique: true,
            required: true,
            default: id
        },
        username: {
            type: String,
            minLength: 1,
            required: true
        },
        credentials: {
            type: {
                email: {
                    type: String,
                    unique: true,
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    required: true
                },
                password: {
                    type: String,
                    set: (value: string): string => hashSync(value, 10),
                    required: true
                }
            },
            required: true
        },
        role: {
            type: String,
            enum: {
                values: Object.values(Role),
                message: '{VALUE} is not supported'
            },
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const {
                    _id,
                    credentials: { email },
                    ...rest
                } = ret;

                return {
                    ...rest,
                    email
                };
            }
        }
    }
);

export default model<StaffDocument>('Staff', staffSchema);
