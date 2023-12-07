import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress';

// Tabs
import Accommodation from './Accommodation'
import GuestDetails from './GuestDetails'
import BookingStatement from './BookingStatement'
import { useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'

import useEmail from '../../../Hooks/useEmail'
import useReservation from '../../../Hooks/useReservation'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import moment from 'moment';

interface ReservationForm {
  name?: string;
  email?: string;
  phone?: string;
  schedule?: number;
  shift?: string;
  accommodations?: {
    accommodationId: string;
    guests: {
      adult: number;
      children: number;
      senior: number;
      pwd: number;
    };
    inclusions: {
      name: string;
      quantity: number;
    }[];
  }[];
}

interface CustomerData {
  name?: string;
  email?: string;
  phone?: string;
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

function Booking() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState("");
  const {sendEmail, sendReservation} = useEmail();
  const {data: reservationData, createReservation} = useReservation();
  const [active,setActive] =  useState(1);
  const {date, shift} = useParams();
  const [otpCode, setOtpCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [form, setForm] = useState<any>({});
  const [billing, setBilling] = useState<any>({
    total: 0,
    guests: 0,
    inclusions: 0,
    accommodations: 0
  })

  const updateSchedule = (date: any, shift: any) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      schedule: new Date(parseInt(date||"", 10)),
      shift: shift==="1"? "day": shift==="2"? "night": "whole day"
    }));
  }

  const updateCustomer = (data: CustomerData) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
      schedule: new Date(parseInt(date||"", 10)).getTime(),
      shift: shift==="1"? "day": shift==="2"? "night": "whole day"
    }));
  };

  const selectAccommodation = (accommodationData: any) => {
    // Add shift property to the accommodationData
    const modifiedAccommodationData = { ...accommodationData, shift: shift==="1"? "day": shift==="2"? "night": "whole day" };
  
    if (form?.accommodations?.some((item: any) => item.accommodationId === accommodationData.accommodationId)) {
      // If the accommodation with the same accommodationId exists, remove it
      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        accommodations: prevForm.accommodations.filter((item: any) => item.accommodationId !== accommodationData.accommodationId),
      }));
    } else {
      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        accommodations: [
          ...(prevForm.accommodations || []),
          {
            ...modifiedAccommodationData,
            inclusions: modifiedAccommodationData.inclusions.map((inclusion: any) => ({
              ...inclusion,
              quantity: 0,
            })),
          },
        ],
      }));
    }
  };
  

  const editGuests = (accommodationId: string, guests: { adult?: number; children?: number; senior?: number; pwd?: number }) => {
    setForm((prevForm: { accommodations: any }) => ({
      ...prevForm,
      accommodations: (prevForm.accommodations || []).map((accommodation: { accommodationId: string, guests?: any }) =>
        accommodation.accommodationId === accommodationId
          ? { ...accommodation, guests: { ...(accommodation.guests || {}), ...guests } }
          : accommodation
      ),
    }));
  };

  const addInclusion = (accommodationId: string, inclusion: any) => {
    setForm((prevForm: { accommodations: any }) => ({
      ...prevForm,
      accommodations: (prevForm.accommodations || []).map((accommodation: { accommodationId: string; inclusions: any }) => {
        if (accommodation.accommodationId === accommodationId) {
          // Check if the inclusion already exists in the inclusions array
          const existingInclusion = accommodation.inclusions.find((existing: any) => existing.name === inclusion.name);
  
          // If it exists, update the quantity
          if (existingInclusion) {
            return {
              ...accommodation,
              inclusions: accommodation.inclusions.map((existing: any) =>
                existing.name === inclusion.name
                  ? { ...existing, quantity: inclusion.quantity }
                  : existing
              ),
            };
          } else {
            // If it doesn't exist, add it with the given quantity
            return {
              ...accommodation,
              inclusions: [...(accommodation.inclusions || []), { ...inclusion, quantity: inclusion.quantity }],
            };
          }
        } else {
          return accommodation;
        }
      }),
    }));
  };

  const calculateCost = (data: any, shift: number) => {
    let accommodations = 0;
    let inclusions = 0;
    let guests = 0;
    let total = 0;

    data.accommodations?.map((accommodation: any) => {
      accommodations += parseInt(accommodation.fees[shift].rate)
      if (accommodation.inclusions) {
        accommodation.inclusions?.map((inclusion: any) => {
          if (inclusion.quantity) {
            
            inclusions += (inclusion.quantity * inclusion.price)
          }
        })
      }
      if (accommodation.guests) {
        if (accommodation.guests.adult) {
          guests += parseInt(accommodation.guests.adult) * parseInt(accommodation.fees[shift].guestFee.adult)
        }
        if(accommodation.guests.children) {
          guests += parseInt(accommodation.guests.children) * parseInt(accommodation.fees[shift].guestFee.kids)
        }
        if(accommodation.guests.senior) {
          guests += parseInt(accommodation.guests.senior) * (parseInt(accommodation.fees[shift].guestFee.adult) * 0.8)
        }
        if(accommodation.guests.pwd) {
          guests += parseInt(accommodation.guests.pwd) * (parseInt(accommodation.fees[shift].guestFee.adult) * 0.8)
        }
      }
    })

    total = accommodations + inclusions + guests

    setBilling({
      total: total,
      guests: guests,
      inclusions: inclusions,
      accommodations: accommodations
    })

    setForm({
      ...data,
      costs: {
        total: total,
        guests: guests,
        inclusions: inclusions,
        accommodations: accommodations
      }
    })
  }

  function checkGuestsForAllAccommodations(data: any) {
    // Check if 'data' is defined and 'accommodations' array exists
    if (data && data.accommodations && data.accommodations.length > 0) {
      // Iterate through each accommodation
      for (const accommodation of data.accommodations) {
        // Check if the accommodation has at least one guest
        if (
          accommodation.guests &&
          (accommodation.guests.adult > 0 ||
            accommodation.guests.kids > 0 ||
            accommodation.guests.senior > 0 ||
            accommodation.guests.pwd > 0)
        ) {
          // Accommodation has at least one guest, continue checking the next one
          continue;
        } else {
          // Accommodation does not have at least one guest, return false
          return false;
        }
      }
  
      // All accommodations have at least one guest, return true
      return true;
    }
  
    // 'data' is not valid or 'accommodations' array is empty, return false
    return false;
    alert("All Accommodations should have at least one guest.")
  }



  function generateOTP(){
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }
  
    return otp;
  }

  const sendVerification = () => {
    if (form.email) {
      let otp = generateOTP();
      setOtpCode(otp)
      sendEmail({
        email: form.email,
        subject: "View Leaf: Email Verification",
        content: `Your One Time Password (OTP) is: ${otp}`,
      })
      console.log(otp)
    }
  }

  async function verifyOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form);
  
    if (otpCode === verificationCode) {
      alert("OTP Verified!");
  
      // Wait for createReservation to complete before logging reservationData
      await createReservation(form);

      

    } else {
      alert("Invalid OTP");
    }
  }

  useEffect(() => {
    updateSchedule(date, shift)
    calculateCost(form,parseInt(shift||"0"))
    if (reservationData) {
      console.log(reservationData);
      sendEmail({
        ...form,
        email: form.email,
        subject: "View Leaf Reservation",
        content: `
        <html lang="en">
          <body>
            <h1>Your view Leaf reservation is waiting for payment</h1>
            <hr>
            <p>Reference Number: ${reservationData.reservationId}</p>
            <p>Scheduled Date: ${moment(new Date(form.schedule)).format('DD/MM/YYYY')}} - ${form.shift}</p>
            <hr>
            <h4>View your reservation details <a href="${process.env.REACT_APP_URL}/reservation/${reservationData.reservationId}">here</a>.</h4>
            <h5>Strictly do not share your reference number as it is used to access your reservation details</h5>
            </body>
        </html>
      `
      });
      navigate(`/payment/${reservationData.reservationId}`);
    }
  }, [form])

  return (
    <Container maxWidth="lg" sx={{padding:"6em 0 7em"}}>
      {active === 1?<>
          
          <Accommodation 
            date={date||""} 
            shift={shift||""}
            form={form}
            updateSchedule={updateSchedule}
            updateCustomer={updateCustomer}
            selectAccommodation={selectAccommodation}
            editGuests={editGuests}
            addInclusion={addInclusion}
          />
      </>:""}
      {active === 2?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Booking Statements</Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Here you will see all breakdown to your reservation</Typography>   
          <BookingStatement 
            additional={false} 
            form={form}
          />
      </>:""}
      {active === 3?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Guest Details </Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Please provide your information to so we can send update to you</Typography>
          <GuestDetails updateCustomer={updateCustomer} form={form} />
      </>:""}
      

      <Paper variant="elevation" elevation={3} sx={{position:"fixed",bottom:"0",left:"0",right:"0",padding:" 0 0 1em ",alignItems:"center"}}>
          {active === 5?"":<Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={active===1?33:0 || active===2?75:0 ||active===3?100:0}/>
          </Box>}

          <Container maxWidth="lg"sx={{display:"flex",alignItems:"center",marginTop:"1em"}}>
              <div style={{flexGrow:"1"}}>
                  <Typography variant="h6" color="initial">TOTAL : ₱{billing?.total}</Typography>
                  <Typography variant="subtitle2" color="initial" fontWeight={600}>Min. Payment of ₱{billing?.accommodations}  </Typography>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                  <Button variant="text" onClick={()=> {if(active>1){setActive(active-1)}}}>
                      back
                  </Button>
                  {active===3?
                    <Button variant="contained" color="primary" 
                    onClick={()=> {
                      sendVerification()
                      setOpen("verify")
                    }}>
                        Finish
                    </Button>
                  :
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (active >= 4) {
                        return; // Exit if active is already 4 or greater
                      }
                  
                      const hasValidGuests = checkGuestsForAllAccommodations(form);
                      const hasAccommodations = form.accommodations?.length > 0;
                  
                      if (hasValidGuests && hasAccommodations) {
                        setActive((prevActive) => prevActive + 1);
                      } else {
                        if (!hasAccommodations) {
                          alert("Must have at least 1 Accommodation");
                        } else {
                          alert("All accommodations should have at least one guest");
                        }
                      }
                    }}
                  >
                    Next
                  </Button>
                  }
              </div>
          </Container> 
      </Paper>
      <Modal
          keepMounted
          open={!(open==="")}
          // onClose={()=>{setOpen("")}}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                {open === "verify"?<>
                <form onSubmit={verifyOTP}>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={600} color={"primary"} component="h2">
                        Email verification
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        We sent you a 6 digit code, please check your email and enter the code to complete the verification and reservation
                    </Typography>
                    <Grid container spacing={2} sx={{marginTop:"35px"}}>
                      <Grid item  xs={8}>
                        <TextField
                          id="OTP"
                          label="OTP"
                          required
                          fullWidth
                          onChange={(e)=>setVerificationCode(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth sx={{height:"100%",background:"#414141"}} type="submit">
                          Verify
                        </Button>
                      </Grid>
                    </Grid>
                </form>
                </>:""}
            </Box>
        </Modal>
    </Container>
  )
}

export default Booking