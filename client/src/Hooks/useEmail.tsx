import React, { useState } from 'react';
import axios from './useAxios'

interface Data {
  sendEmail: (data: SendEmailData ) => void;
}

interface SendEmailData {
  email: string,
  subject: string,
  content: unknown
}

function useEmail(): Data {

  const sendEmail = async (data: SendEmailData) => {
    try {
      await axios
      .post('/emails', {
        to: data.email,
        subject: data.subject,
        content: data.content
      })
      .then((response:any)=>{
        console.log(response.data);
        alert("OTP Sent!");
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  return { 
    sendEmail 
  };
}

export default useEmail;
