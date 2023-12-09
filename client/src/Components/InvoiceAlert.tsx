import React from 'react'
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating';
type Props = {
  status:"pending" | "paid" | "approved" | "declined" | "refunding" | "rescheduling" | "cancelling" | "checked in" | "refunded" | "cancelled" | "checked out" 
  note?:string
}
function InvoiceAlert({status,note}:Props) {
  return <>
   

    
  </>
}

export default InvoiceAlert