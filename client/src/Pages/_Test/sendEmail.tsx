import { ReservationStatusEmail } from './reservationStatusTemplate';
import { Resend } from 'resend';

import React from 'react';
import { Button } from '@react-email/components';
import { FormLabel } from '@mui/material';
import { Input } from '@mui/material';
import axios from 'axios';
import { Emails } from 'resend/build/src/emails/emails';

import useEmail from './../../Hooks/useEmail';

interface sendingEmail {
    from: string;
    to: string;
    subject: string;
    react: any;
}

const dateAsString = '2023-11-10T12:00:00Z';

// export async function POST(requests: Request) {
//     try {
//         await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: 'deuzaxel@gmail.com',
//             subject: 'Reservation Status',
//             react: ReservationStatusEmail({
//                 reservationNumber: '12345',
//                 reservationDate: new Date(dateAsString),
//                 reservationStatus: 'Pending',
//             }),
//         });

//         console.log("Email sent!");
//     } catch (error) {
//         console.error(error);
//     }
// }

const SendEmails = () => {
    const { sendEmail } = useEmail();

    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        sendEmail({
            to: 'carlocruz635@gmail.com',
            subject: 'Reservation Details',
            content: 'test'
        });
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input id="firstName" name="firstName" />
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" />
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} type="submit">
                Sign Up
            </button>
        </form>
    );
};

export default SendEmails;
