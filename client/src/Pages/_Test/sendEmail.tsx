import { ReservationStatusEmail } from './reservationStatusTemplate';
import { Resend } from 'resend';

import React, {useState, useEffect} from 'react';
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

const SendEmails = () => {
    const { sendEmail } = useEmail();

    const customerName = "Gian";
    const userEmail = "carlocruz635@gmail.com";
    const reservationNumber = '123456789';
    const reservationDate = new Date(dateAsString);
    const reservationStatus = 'Confirmed';

    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        sendEmail({
            email: userEmail,
            subject: 'Reservation Details',
            content: ` <h1><strong>Reservation Details</strong></h1><br>
                    <br>Dear ${customerName},
                    <br>The details of your reservation are as follows:
                    <br>Reservation Number: ${reservationNumber}<br>
                    Reservation Date: ${reservationDate}<br>
                    Reservation Status: ${reservationStatus}<br>
                    <br><br>
                    If the following details on this email are incorrect, please contact the admin or the staff regarding your reservation.`,
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
