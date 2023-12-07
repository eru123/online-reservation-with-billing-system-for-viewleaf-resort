import React, {useState, useEffect}  from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import BookingStatement from '../Guests/Booking/BookingStatement';
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import RateInput from '../../Components/RateInput';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useParams, useNavigate  } from 'react-router-dom';
import InvoiceAlert from '../../Components/InvoiceAlert';


import useReservation from '../../Hooks/useReservation';
import useEmail from '../../Hooks/useEmail';

import moment from 'moment';

type Props = {
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px"
};
function Invoice() {
    const navigate = useNavigate();
    const {sendEmail} = useEmail();
    const [open, setOpen] = React.useState("");
    const {id} = useParams();
    const {data, loading, error, getReservation, updateReservation} = useReservation();
    const [status, setStatus] = React.useState<"pending" | "paid" | "approved" | "declined" | "refunding" | "rescheduling" | "cancelling" | "checked in" | "refunded" | "cancelled" | "checked out">("checked out");
    const [note, setNote] = useState<string>("")

    const submit = async (status: string, note: string) => {
      updateReservation({
        reservationId: id||"",
        status: status,
        note: note
      })
      await sendEmail({
        email: data?.[0]?.customer?.email,
        subject: `View Leaf Reservation is ${status}`,
        content: `
        <html lang="en">
          <body>
            <h1>View Leaf reservation is ${status}</h1>
            <hr>
            <p>Reference Number: ${data?.[0]?.reservationId}</p>
            <p>Scheduled Date: ${ moment(data?.[0]?.schedule).format('DD/MM/YYYY')} - ${data?.[0]?.invoices?.[0]?.shift}</p>
            ${note ? `<p>Note: ${note}</p>` : ""}
            <hr>
            <h4>View your reservation details <a href="${process.env.REACT_APP_URL}/reservation/${data?.[0]?.reservationId}">here</a>.</h4>
            <h5>Strictly do not share your reference number as it is used to access your reservation details</h5>
            </body>
        </html>
      `
      })
      navigate(`/admin/invoice/${id}`)
    }
    

    useEffect(()=>{
      if (data?.[0]) {
        setStatus(data?.[0]?.status)
      } else {
        getReservation({
          reservationId: id || ""
        })
      }
    }, [data])

    if (loading) {
      return <div>Loading...</div>;
    }
    
    return<>
        <Container maxWidth="lg"  sx={{padding:"6em 0 7em"}}>
            <Box display="flex" gap={"15px"} sx={{flexWrap:"wrap"}} mt={2}>

                {status ==="approved"?<>
                  <Chip icon={<CurrencyExchangeIcon />} label="Refund" variant="outlined" onClick={()=>{setOpen("refund")}} />
                  <Chip icon={<EventRepeatIcon     />} label="Reschedule" variant="outlined" onClick={()=>{setOpen("reschedule")}} />
                  <Chip icon={<DoNotDisturbAltIcon />} label="Cancel" variant="outlined" onClick={()=>{setOpen("cancel")}} />
                </>:""}
                {status ==="checked in"?<>
                  <Chip icon={<CurrencyExchangeIcon />} label="Get Refund" variant="outlined" onClick={()=>{setOpen("refund")}} />
                </>:""}

                <Box sx={{flexGrow:"1"}} ></Box>

                {status === "paid"?
                  <>
                    <Chip  label="Decline" variant="outlined" onClick={()=>{submit("declined", " ")}} color="primary" />
                    <Chip  label="Accept" variant="filled" onClick={()=>{submit("approved", " ")}} color="primary" />
                  </>:""    
                }

                {status === "approved"?
                  <>
                    <Chip  label="Check In" variant="filled" onClick={()=>{submit("checked in", " ")}} color="primary" />
                  </>:""    
                }
                {status === "refunding"?
                  <>
                    <Chip  label="Decline" variant="outlined" onClick={()=>{submit("approved", " ")}} color="primary" />
                    <Chip  label="Accept" variant="filled" onClick={()=>{submit("refunded", " ")}} color="primary" />
                  </>:""    
                }
                {status === "rescheduling"?
                  <>
                    <Chip  label="Decline" variant="outlined" onClick={()=>{submit("approved", " ")}} color="primary" />
                    <Chip  label="Accept" variant="filled" onClick={()=>{submit("approved", " ")}} color="primary" />
                  </>:""    
                }
                {status === "cancelling"?
                  <>
                    <Chip  label="Decline" variant="outlined" onClick={()=>{submit("declined", " ")}} color="primary" />
                    <Chip  label="Accept" variant="filled" onClick={()=>{submit("cancelled", " ")}} color="primary" />
                  </>:""    
                }
                {status === "checked in"?
                  <>
                    <Chip icon={<AddIcon />} label="Add" variant="outlined" component={Link} to={'/admin/reservation/add'} sx={{cursor:"pointer"}} color="primary" />
                    <Chip  label="Checked Out" variant="filled" onClick={()=>{submit("checked out", " ")}} color="primary" />
                  </>:""    
                }
            </Box>

            <InvoiceAlert status={status} note="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut maiores eius porro tempore sit? Quae, eos facere praesentium porro doloribus fugiat quo reprehenderit laborum ab, maiores iusto distinctio modi molestias!"/>
                

            <Box display="flex" sx={{margin:"25px 0"}}>
                <Box sx={{flexGrow:"1"}}>
                    <Typography variant="h4" color="primary" >#{data?.[0]?.reservationId}</Typography>
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>Reference Number</Typography>
                </Box>
                <Box >
                    <Typography textAlign={"end"} variant="h4" color="primary" >{ moment(new Date(data?.[0]?.schedule)).format('DD/MM/YYYY')} - {data?.[0]?.invoices?.[0]?.shift}</Typography>
                    <Typography textAlign={"end"} variant="h6" color="initial" sx={{opacity:".6"}}>Scheduled Date</Typography>
                </Box>
            </Box>
            
            
            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",background:"#e3e3e3",padding:"1em",margin:"2em 0" ,display:"flex",alignItems:"center"}}>
                <Box sx={{flexGrow:"1"}}>
                    <Typography variant="h5" color="initial" fontWeight={500}>{data?.[0]?.customer?.name}</Typography>
                    <Box display="flex" gap={"15px"} mt={1}>
                        <Box display="flex" gap="5px">
                            <CallIcon/>
                            <Typography variant="body1" color="initial">{data?.[0]?.customer?.phone}</Typography>
                        </Box>
                        <Box display="flex" gap="5px">
                            <EmailIcon/>
                            <Typography variant="body1" color="initial">{data?.[0]?.customer?.email}</Typography>
                        </Box>
                    </Box>
                </Box>
                {status==="pending"?"":
                  <Tooltip title="View Receipt">
                      <IconButton aria-label="" onClick={()=>{setOpen("viewReceipt")}} size="large" >
                          <ReceiptLongIcon  fontSize="inherit"/>
                      </IconButton>
                  </Tooltip>
                }
                
            </Paper>

            <Typography variant="h6" color="initial">Billing Statement</Typography>
            { data?.[0]?.invoices &&  <BookingStatement additional={false} form={data?.[0]?.invoices} invoices={data}/> }

            <hr style={{margin:"2em 0"}}/>
{/*             
            <Typography variant="h6" color="initial">Billing Statement #1</Typography>
            <BookingStatement additional={false}/>
            
            <Typography variant="h6" color="initial">Billing Statement #2</Typography>
            <BookingStatement additional={true}/> */}

        </Container>

        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                {open ==="reschedule"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Reschedule Reservation
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Input your desired date to be moved on
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item md={8} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker slotProps={{ textField: { fullWidth: true } }} label="Basic date picker" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={4} xs={12} marginTop={"8px"}>
                            <TextField
                                id="reason"
                                label=" Reason"
                                multiline
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{marginBottom:"25px"}}>
                            <TextField
                                id="reason"
                                label=" Reason"
                                multiline
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <Button variant="text" onClick={()=>{setOpen("")}} fullWidth>Cancel</Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained" fullWidth>Send</Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open ==="refund"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Refund
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Only the 50% of the payment is refundable
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{marginBottom:"25px"}}>
                            <TextField
                                id="reason"
                                label=" Reason"
                                multiline
                                fullWidth
                                required
                                onChange={(e)=>{setNote(e.target.value)}}
                            />
                        </Grid>

                        <Grid item xs={5} marginBottom={"20px"}>
                            <Button variant="text" onClick={()=>{setOpen("");}} fullWidth>Cancel</Button>
                        </Grid>
                        <Grid item xs={7} marginBottom={"20px"}>
                            <Button variant="contained" fullWidth onClick={()=>{setOpen(""); submit("refunded", note)}}>Send</Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open ==="cancel"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Cancel Reservation
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Provide a reason why you want to cancel
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{marginBottom:"25px"}}>
                            <TextField
                                id="reason"
                                label=" Reason"
                                multiline
                                fullWidth
                                required
                                onChange={(e)=>{setNote(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={5} marginBottom={"20px"}>
                            <Button variant="text" onClick={()=>{setOpen("");}} fullWidth>Cancel</Button>
                        </Grid>
                        <Grid item xs={7} marginBottom={"20px"}>
                            <Button variant="contained" fullWidth onClick={()=>{setOpen(""); submit("cancelled", note)}}>Send</Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open ==="rate"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Set Schedule
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Specify the date you want to stay with us
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="initial">Ratings</Typography>
                            <RateInput/>
                        </Grid>
                        <Grid item xs={12} marginBottom={"20px"}>
                            <Typography variant="subtitle2" sx={{marginBottom:"10px"}} color="initial">Feedback</Typography>
                            <TextField id="feedback" fullWidth multiline/>
                        </Grid>
                        <Grid item xs={5} marginBottom={"20px"}>
                            <Button variant="text" onClick={()=>{setOpen("")}} fullWidth>Cancel</Button>
                        </Grid>
                        <Grid item xs={7} marginBottom={"20px"}>
                            <Button variant="contained" fullWidth>Send</Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open ==="viewReceipt"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        View Receipt 
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Attached Image for receipt 
                    </Typography>
                    <Grid container spacing={2}>
                      { data?.[0]?.receipts?.map((receipt:any)=>(
                        <Grid item xs={12} sx={{marginBottom:"25px",overflowY:"scroll",maxHeight:"500px"}}>
                          <img style={{width:"100%"}} src={receipt} alt="" />
                        </Grid>
                      ))}
                    </Grid>
                </>:""}
            </Box>
        </Modal>
    </> 
}

export default Invoice