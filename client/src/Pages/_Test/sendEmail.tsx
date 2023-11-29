// SendEmails.tsx
import React from 'react';
import { FormLabel, Input } from '@mui/material';
import useEmail from './../../Hooks/useEmail';

const dateAsString = '2023-11-10T12:00:00Z';

const userEmail = 'carlocruz635@gmail.com';
const reservationNumber = '123456789';
const reservationDate = new Date(dateAsString);
const reservationStatus = 'Confirmed';

// Your HTML string template
const emailContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>

    <body style="
            background-color: #ffffff;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        ">
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto">
            <tr style="width: 100%">
                <td>
                    <table style="margin-top: 32px" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody></tbody>
                    </table>
                    <h1 style="color: #1d1c1d; font-size: 36px; font-weight: 700; margin: 30px 0; padding: 0; line-height: 42px">RESERVATION STATUS</h1>
                    <p style="font-size: 20px; line-height: 28px; margin: 16px 0; margin-bottom: 30px">The details of your reservation are as follows:</p>
                    <table style="background: rgb(245, 244, 245); border-radius: 4px; margin-right: 50px; margin-bottom: 30px; padding: 43px 23px"
                        align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <p style="font-size: 20px; line-height: 24px; margin: 16px 0; text-align: center; vertical-align: middle">
                                        Reservation Number: ${reservationNumber}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="font-size: 20px; line-height: 24px; margin: 16px 0; text-align: center; vertical-align: middle">
                                        Reservation Date: ${reservationDate.toDateString()}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="font-size: 20px; line-height: 24px; margin: 16px 0; text-align: center; vertical-align: middle">
                                        Reservation Status: ${reservationStatus}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="font-size: 14px; line-height: 24px; margin: 16px 0; color: #000">
                        If the following details on this email are incorrect, please contact the admin or the staff regarding your reservation.
                    </p>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table width="100%" style="margin-bottom: 32px; padding-left: 8px; padding-right: 8px; width: 100%"
                                        align="center" role="presentation" cellspacing="0" cellpadding="0" border="0"></table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <p style="font-size: 12px; line-height: 15px; margin: 16px 0; color: #b7b7b7; text-align: left; margin-bottom: 50px">
                                        Ponte Verde Dr, Marikina, <br />1809 Metro Manila <br /><br />contact #: 0917 147 2643
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
`;

const SendEmails: React.FC = () => {
  const { sendEmail } = useEmail();

  const customerName = 'Gian';

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    sendEmail({
      email: userEmail,
      subject: 'Reservation Details',
      content: emailContent,
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
