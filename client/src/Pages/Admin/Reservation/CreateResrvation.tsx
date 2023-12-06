import React,{useState} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {useNavigate} from 'react-router-dom';


import Accommodation from '../../Guests/Booking/Accommodation';
import useEmail from '../../../Hooks/useEmail'
import useReservation from '../../../Hooks/useReservation'

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

function CreateResrvation() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState("");
  const {sendEmail, sendReservation} = useEmail();
  const {data: reservationData, createReservation} = useReservation();
    const [step,setStep] = useState(1);
    const [selectedAccommodations, setSelectedAccommodations] = useState<any>([]);
    const [form, setForm] = useState<any>({});
    const [billing, setBilling] = useState<any>({
      total: 0,
      guests: 0,
      inclusions: 0,
      accommodations: 0
    })

  const [date, setDate] = useState("")
  const [shift, setShift] = useState("")

    
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

    return <>
        <Container maxWidth="lg">
            {step===1?<>
                <Box display="flex" alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <div style={{flexGrow:'1'}}>
                        <Typography variant="h4" fontWeight={600} color="primary">Select Accommodation</Typography>
                        <Typography variant="h6" fontWeight={400} color="initial" >You can choose multiple accommodation</Typography>
                    </div>
                    <Box display="flex" gap={"10px"}>
                        <Button variant="text" color="primary">
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(2)}}>
                            Next
                        </Button>
                    </Box>
                </Box>
                {/* <Accommodation date={date||""} shift={shift||""} selectedAccommodations={selectedAccommodations} setSelectedAccommodations={setSelectedAccommodations}/> */}
            </>:""}
            {step===2?<>
                <Box display="flex" alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <div style={{flexGrow:'1'}}>
                        <Typography variant="h4" fontWeight={600} color="primary">Booking Payment</Typography>
                        <Typography variant="h6" fontWeight={400} color="initial">Here you will see all breakdown to your reservation</Typography>
                    </div>
                    <Box display="flex" gap={"10px"}>
                        <Button variant="text" color="primary" onClick={()=>{setStep(1)}}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(3)}}>
                        Set as Paid
                        </Button>
                    </Box>
                    
                </Box>
                
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                        },
                    }}
                    >
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="body2" color="initial">Day Shift - October 15, 2023</Typography>
                            {/* Accommodation */}
                            <Box display="flex" sx={{marginBottom:"10px"}}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h5" fontWeight={500} color="initial">Duplex Renov A </Typography>
                                </div>
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>300</Typography>
                            </Box>
                            {/* Inclussions */}
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Mattress</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Towel</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Slippers</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="body2" color="initial">Day Shift - October 15, 2023</Typography>
                            {/* Accommodation */}
                            <Box display="flex" sx={{marginBottom:"10px"}}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h5" fontWeight={500} color="initial">Duplex Renov B</Typography>
                                </div>
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>300</Typography>
                            </Box>
                            {/* Inclussions */}
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Mattress</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Towel</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>
                            <Box display="flex" >
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="subtitle1" fontWeight={500}  color="initial">Slippers</Typography>
                                    <Typography variant="body2"   color="initial" sx={{opacity:".6"}}>  1 x 100 </Typography>
                                </div> 
                                <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                            </Box>


                            
                        </TimelineContent>
                    </TimelineItem>
                    
                </Timeline>
                <Box sx={{padding:"0 32px"}}>
                    <Typography variant="subtitle1" textAlign="end" color="initial" fontWeight={600} sx={{opacity:".6"}}>TOTAL</Typography>
                    <Typography variant="h5" textAlign="end" color="initial" fontWeight={600}>₱300</Typography>
                </Box>
                
            </>:""}
            {step===3?<>
                <Box display="flex" alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <div style={{flexGrow:'1'}}>
                        <Typography variant="h4" fontWeight={600} color="primary">Guest Details</Typography>
                        <Typography variant="h6" fontWeight={400} color="initial">Please Provide the information of the Guest</Typography>
                    </div>
                    
                    <Button variant="contained" color="primary" href='/admin/reservation/view'>
                        Finish
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6} xs={8}>
                        <TextField
                            id="email"
                            label="Email"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="contactNo"
                            label="Contact Number"
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </>:""}
        </Container>
    </>
}
export default CreateResrvation