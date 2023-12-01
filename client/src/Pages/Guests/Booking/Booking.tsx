import React,{useState, useEffect} from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// Tabs
import Accommodation from './Accommodation'
import GuestDetails from './GuestDetails'
import BookingStatement from './BookingStatement'
import Payment from './Payment'
import { useParams } from 'react-router-dom'

import useAccommodation from '../../../Hooks/useAccommodation'
import useEmail from '../../../Hooks/useEmail'

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

function Booking() {
  const {sendEmail} = useEmail();
  const [active,setActive] =  useState(1);
  const {date, shift} = useParams();
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
    }));
  };

  const selectAccommodation = (accommodationData: any) => {
    if (form?.accommodations?.some((item: any) => item.accommodationId === accommodationData.accommodationId)) {
      // If the accommodation with the same accommodationId exists, remove it
      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        accommodations: prevForm.accommodations.filter((item: any) => item.accommodationId !== accommodationData.accommodationId),
      }));
    } else {
      // If the accommodation with the same accommodationId doesn't exist, add it
      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        accommodations: [...(prevForm.accommodations || []), accommodationData],
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
      sendEmail({
        email: form.email,
        subject: "View Leaf: Email Verification",
        content: `Your One Time Password (OTP) is: ${otp}`,
      })
      console.log(otp)
    }
  }
  

  useEffect(() => {
    updateSchedule(date, shift)
    calculateCost(form,parseInt(shift||"0"))
  }, [form])

  return (
    <Container maxWidth="lg" sx={{padding:"6em 0 7em"}}>
      {active === 1?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Selected Accommodation</Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Select you want to rent</Typography>
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
                    <Button variant="contained" color="primary" onClick={()=> {sendVerification()}}>
                        Finish
                    </Button>
                  :
                    <Button variant="contained" color="primary" onClick={()=> {if(active<4){setActive(active+1)}}}>
                        Next
                    </Button>
                  }
              </div>
          </Container> 
      </Paper>
    </Container>
  )
}

export default Booking