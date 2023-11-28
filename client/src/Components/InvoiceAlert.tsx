import React from 'react'
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

type Props = {
  status:"pending" | "paid" | "approved" | "declined" | "refunding" | "rescheduling" | "cancelling" | "checkedIn" | "refunded" | "cancelled" | "checkedOut" 
  note?:string
}
function InvoiceAlert({status,note}:Props) {
  return <>
    {status==="pending"?
      <Alert severity="info" sx={{margin:"2em 0"}}>This reservation haven't upload any payment!</Alert>
    :""}
    {status==="paid"?
      <Alert severity="warning" sx={{margin:"2em 0"}}>This reservation is waiting for approval of reservation</Alert>
    :""}
    {status==="approved"?
      <Alert severity="info" sx={{margin:"2em 0"}}>This reservation is approved, waiting to checked in</Alert>
    :""}
    {status==="declined"?
      <>
        <Alert severity="error" sx={{margin:"2em 0 0", zIndex:"23"}}>This reservation request is declined</Alert>
        <Paper variant="elevation" elevation={1} sx={{marginTop:"-2px",background:"white",padding:"1em"}}>
          <Typography variant="subtitle1" fontWeight={600} color="initial">Note</Typography>
          <Typography variant="body2"  color="initial">
            {note}
          </Typography>
        </Paper>
      </>
    :""}

    {status==="refunding"?
      <>
        <Alert severity="warning" sx={{margin:"2em 0 0", zIndex:"23"}}>Requests for Refund!</Alert>
        <Paper variant="elevation" elevation={1} sx={{marginTop:"-2px",background:"white",padding:"1em"}}>
          <Typography variant="subtitle1" fontWeight={600} color="initial">Note</Typography>
          <Typography variant="body2"  color="initial">
            {note}
          </Typography>
        </Paper>
      </>
    :""}
    {status==="rescheduling"?
      <>
        <Alert severity="warning" sx={{margin:"2em 0 0", zIndex:"23"}}>Requests for reschedule!</Alert>
        <Paper variant="elevation" elevation={1} sx={{marginTop:"-2px",background:"white",padding:"1em"}}>
          <Typography variant="subtitle1" fontWeight={600} color="initial">Note</Typography>
          <Typography variant="body2"  color="initial">
            {note}
          </Typography>
        </Paper>
      </>
    :""}
    {status==="cancelling"?
      <>
        <Alert severity="warning" sx={{margin:"2em 0 0", zIndex:"23"}}>Requests to cancel!</Alert>
        <Paper variant="elevation" elevation={1} sx={{marginTop:"-2px",background:"white",padding:"1em"}}>
          <Typography variant="subtitle1" fontWeight={600} color="initial">Note</Typography>
          <Typography variant="body2"  color="initial">
            {note}
          </Typography>
        </Paper>
      </>
    :""}
    {status==="checkedIn"?
      <Alert severity="info" sx={{margin:"2em 0"}}>This reservation is checked in already</Alert>
    :""}
    {status==="checkedOut"?
      <Alert severity="success" sx={{margin:"2em 0"}}>This Reservation is done</Alert>
    :""}


    {status==="refunded"?
      <Alert severity="error" sx={{margin:"2em 0"}}>This reservation is refunded </Alert>
    :""}
    {status==="cancelled"?
      <Alert severity="error" sx={{margin:"2em 0"}}>This reservation is canceled </Alert>
    :""}

    
  </>
}

export default InvoiceAlert