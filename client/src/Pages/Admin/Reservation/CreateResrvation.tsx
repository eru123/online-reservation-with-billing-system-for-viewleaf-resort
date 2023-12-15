import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {useNavigate} from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BookingStatement from './../../Guests/Booking/BookingStatement'

import Accommodation from '../../Guests/Booking/Accommodation';
import useEmail from '../../../Hooks/useEmail'
import useReservation from '../../../Hooks/useReservation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

import moment from 'moment';
import useAccommodation from '../../../Hooks/useAccommodation'
import useContent from '../../../Hooks/useContent';

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
      kids: number;
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
  const [bookingSchedule, setBookingSchedule] = useState<any>({
    date : new Date().getTime(),
    shift : "0",
  });
  const navigate = useNavigate()
  const [open, setOpen] = React.useState("");
  const {sendEmail, sendReservation} = useEmail();
  const {data: reservationData, createReservation, updateReservation} = useReservation();
    const [step,setStep] = useState(1);
    const [selectedAccommodations, setSelectedAccommodations] = useState<any>([]);
    const [form, setForm] = useState<any>({});
    const [billing, setBilling] = useState<any>({
      total: 0,
      guests: 0,
      inclusions: 0,
      accommodations: 0
    })

  const {data:accommodations, getAccommodation} = useAccommodation();
  
  const {data:content, loading:contentLoading, error:contentError, getContent} = useContent();

  const updateSchedule = (date: any, shift: any) => {
    console.log(date)
    setForm((prevForm: any) => ({
      ...prevForm,
      schedule: parseInt(date||""),
      shift: shift==="0"? "day": shift==="1"? "night": "whole day"
    }));
  }

  const updateCustomer = (data: CustomerData) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
      schedule: new Date(parseInt(bookingSchedule.date||"", 10)).getTime(),
      shift: bookingSchedule.shift==="0"? "day": bookingSchedule.shift==="1"? "night": "whole day"
    }));
  };

  const selectAccommodation = (accommodationData: any) => {
    // Add shift property to the accommodationData
    const modifiedAccommodationData = { ...accommodationData, shift: bookingSchedule.shift==="0"? "day": bookingSchedule.shift==="1"? "night": "whole day" };
  
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
  

  const editGuests = (accommodationId: string, guests: { adult?: number; kids?: number; senior?: number; pwd?: number }) => {
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

  const calculateCosts = () => {
    let totalAll = 0
    let minimumAll = 0
    let inclusionsAll = 0
    let guestsAll = 0

    setForm((prevForm: { accommodations: any }) => ({
      ...prevForm,
      accommodations: (prevForm.accommodations || []).map((accommodation: { accommodationId: string; inclusions: any; fees: any; guests: any; }) => {
        let total = 0
        let minimum = 0
        let inclusions = 0
        let guests = 0

        minimum += parseInt(accommodation?.fees?.[0]?.rate)
        minimumAll += parseInt(accommodation?.fees?.[0]?.rate)

          if (accommodation.inclusions) {
            accommodation.inclusions?.map((inclusion: any) => {
              if (inclusion.quantity) {
                inclusions += (inclusion.quantity * inclusion.price)
                inclusionsAll += (inclusion.quantity * inclusion.price)
              }
            })
          }

          if (accommodation.guests) {
            if (accommodation.guests.adult) {
              guests += parseInt(accommodation.guests.adult) * parseInt(accommodation?.fees?.[0]?.guestFee.adult)
              guestsAll += parseInt(accommodation.guests.adult) * parseInt(accommodation?.fees?.[0]?.guestFee.adult)
            }
            if(accommodation.guests.kids) {
              guests += parseInt(accommodation.guests.kids) * parseInt(accommodation?.fees?.[0]?.guestFee.kids)
              guestsAll += parseInt(accommodation.guests.kids) * parseInt(accommodation?.fees?.[0]?.guestFee.kids)
            }
            if(accommodation.guests.senior) {
              guests += parseInt(accommodation.guests.senior) * (parseInt(accommodation?.fees?.[0]?.guestFee.adult) * 0.8)
              guestsAll += parseInt(accommodation.guests.senior) * (parseInt(accommodation?.fees?.[0]?.guestFee.adult) * 0.8)
            }
            if(accommodation.guests.pwd) {
              guests += parseInt(accommodation.guests.pwd) * (parseInt(accommodation?.fees?.[0]?.guestFee.adult) * 0.8)
              guestsAll += parseInt(accommodation.guests.pwd) * (parseInt(accommodation?.fees?.[0]?.guestFee.adult) * 0.8)
            }
            
          }
        total = minimum +  inclusions + guests
        totalAll += total

        return {
          ...accommodation,
          total: content?.promo === 0 ? total : total * ((100 - content?.promo) / 100) ,
          minimum: content?.promo === 0 ? minimum : minimum * ((100 - content?.promo) / 100)
        }

      }),
      
      costs: {
        total: totalAll,
        accommodations: minimumAll
      },
    }));
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

  async function addReservation() {
    // Wait for createReservation to complete before logging reservationData
    await createReservation(form);
  }

  useEffect(() => {
    updateSchedule(bookingSchedule.date, bookingSchedule.shift)
    calculateCosts()

    console.log(form)

    if (!content || content.length === 0){
      getContent();
    }

    if (reservationData) {
      
      sendEmail({
        ...form,
        email: form.email,
        subject: "View Leaf Reservation",
        content: `
        <html lang="en">
          <body>
            <h1>Your view Leaf reservation is booked</h1>
            <hr>
            <p>Reference Number: ${reservationData.reservationId}</p>
            <p>Scheduled Date: ${moment(new Date(form.schedule)).format('DD/MM/YYYY')} - ${form.shift==="1"? "day": form.shift==="2"? "night": "whole day"}</p>
            <hr>
            <h4>View your reservation details <a href="${process.env.REACT_APP_URL}/reservation/${reservationData.reservationId}">here</a>.</h4>
            <h5>Strictly do not share your reference number as it is used to access your reservation details</h5>
            </body>
        </html>
      `
      });
      updateReservation({
        reservationId: reservationData.reservationId||"",
        status: "approved",
        note: " "
      })
      
      navigate(`/admin/invoice/${reservationData.reservationId}`);
    }
  }, [form])

    return <>
        <Container maxWidth="lg">
            {step===1?<>
                <Box display="flex"  alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <Box sx={{flexGrow:'1'}}>
                      <Typography variant="h4" fontWeight={600} color="primary">Select Accommodation</Typography>
                      <Typography variant="h6" fontWeight={400} color="initial" >You can choose multiple accommodation</Typography>
                    </Box>
                    <Box display="flex" gap={"10px"}>
                        <Button variant="text" color="primary">
                            Back
                        </Button>
                        <Button variant="contained" color="primary" 
                          onClick={()=>{
                            if (checkGuestsForAllAccommodations(form)){
                              setStep(2);
                            } else{
                              alert("All accommodations should have at least one guest")
                            }
                          }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"start"} gap={2} mb={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                      slotProps={{ 
                        textField: {required:true} ,
                      }}
                      minDate={dayjs()}
                      onChange={(newDate:any) => {
                        setBookingSchedule({ ...bookingSchedule, date: new Date(newDate).getTime() });
                      }}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{width:"200px"}} required>
                    <InputLabel id="demo-simple-select-label">shift</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bookingSchedule.shift}
                      label="Shift"
                      onChange={(e) => {
                        setBookingSchedule({ ...bookingSchedule, shift: e.target.value });
                      }}
                    >
                      <MenuItem value={"0"}>Day Shift</MenuItem>
                      <MenuItem value={"1"}>Night Shift</MenuItem>
                      <MenuItem value={"2"}>Whole Shift</MenuItem>
                    </Select>
                    </FormControl>
                </Box>
                
                {bookingSchedule?.date && bookingSchedule?.shift?<>
                  <Accommodation 
                    date={bookingSchedule.date||""} 
                    shift={bookingSchedule.shift||""}
                    form={form}
                    updateSchedule={updateSchedule}
                    updateCustomer={updateCustomer}
                    selectAccommodation={selectAccommodation}
                    editGuests={editGuests}
                    addInclusion={addInclusion}
                  />
                </> : <></>}

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
                <BookingStatement 
                  additional={false} 
                  form={form}
                />
                {/* <Box sx={{padding:"0 32px"}}>

                    <Typography textAlign={"end"} variant="h6" color="initial">TOTAL : {content?.promo === 0 ? `₱${form?.costs?.total}` : ` from ₱${form?.costs?.total} to  ₱${form?.costs?.total * ((100 - content?.promo) / 100)} `} </Typography>
                    <Typography  textAlign={"end"} variant="subtitle2" color="initial" fontWeight={600}>Min. Payment of {content?.promo === 0 ? `₱${form?.costs?.accommodations}` : ` from ₱${form?.costs?.accommodations} to  ₱${form?.costs?.accommodations * ((100 - content?.promo) / 100)} `}  </Typography>
                
                </Box> */}
                
            </>:""}
            {step===3?<>
                <Box display="flex" alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <div style={{flexGrow:'1'}}>
                        <Typography variant="h4" fontWeight={600} color="primary">Guest Details</Typography>
                        <Typography variant="h6" fontWeight={400} color="initial">Please Provide the information of the Guest</Typography>
                    </div>
                    
                    <Button variant="contained" color="primary" onClick={()=>{addReservation()}}>
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
                            onChange={(e)=>{
                              updateCustomer({
                                name: e.target.value
                              });
                              console.log(e.target.value)
                            }}  
                        />
                    </Grid>
                    <Grid item md={6} xs={8}>
                        <TextField
                            id="email"
                            label="Email"
                            required
                            fullWidth
                            onChange={(e)=>{
                              updateCustomer({
                                email: e.target.value
                              })  
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="contactNo"
                            label="Contact Number"
                            required
                            fullWidth
                            onChange={(e)=>{
                              updateCustomer({
                                phone: e.target.value
                              })
                            }}
                        />
                    </Grid>
                </Grid>
            </>:""}
        </Container>
    </>
}
export default CreateResrvation