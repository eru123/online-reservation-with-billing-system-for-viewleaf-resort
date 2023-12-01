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
  const [active,setActive] =  useState(1);
  const {date, shift} = useParams();
  const [selectedAccommodations, setSelectedAccommodations] = useState<any>([]);

  const [form, setForm] = useState<any>({});


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
      name: data.name,
      email: data.email,
      phone: data.phone
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
  

  const editGuests = (accommodationId: string, adults: number, children: number, senior: number, pwd: number) => {
    setForm((prevForm: { accommodations: any }) => ({
      ...prevForm,
      accommodations: (prevForm.accommodations || []).map((accommodation: { accommodationId: string }) =>
        accommodation.accommodationId === accommodationId
          ? { ...accommodation, guests: { adult: adults, children: children, senior: senior, pwd: pwd } }
          : accommodation
      ),
    }));
  };
  
  const addInclusion = (accommodationId: string, inclusion: any) => {
    setForm((prevForm: { accommodations: any }) => ({
      ...prevForm,
      accommodations: (prevForm.accommodations || []).map((accommodation: { accommodationId: string; inclusions: any }) =>
        accommodation.accommodationId === accommodationId
          ? {
              ...accommodation,
              inclusions: [...(accommodation.inclusions || []), inclusion],
            }
          : accommodation
      ),
    }));
  };

  let called = false

  useEffect(() => {
    updateSchedule(date, shift)
    // if (!called) {
    //   updateCustomer({
    //     name: "Jane Doe",
    //     email: "jane@test.com",
    //     phone: "09123455"
    //   })
    //   addAccommodation({
    //     accommodationId: "1",
    //     guests: {
    //       adult: 1,
    //       children: 0,
    //       senior: 0,
    //       pwd: 0
    //     },
    //     inclusions: []
    //   })
    //   addAccommodation({
    //     accommodationId: "2",
    //     guests: {
    //       adult: 1,
    //       children: 5,
    //       senior: 4,
    //       pwd: 2
    //     },
    //     inclusions: []
    //   })
    //   addInclusion("1", {
    //     name: "Breakfast",
    //     quantity: 1
    //   })
    //   editGuests("1", 9, 8, 7, 6)
    //   called = true
    // }
  }, [])

  const testFunction = () => {
    
    console.log(form)
  }

  

  return (
    <Container maxWidth="lg" sx={{padding:"6em 0 7em"}}>
      {JSON.stringify(form)}
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
          <BookingStatement additional={false} selectedAccommodations={selectedAccommodations}/>
      </>:""}
      {active === 3?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Guest Details </Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Please provide your information to so we can send update to you</Typography>
          <GuestDetails/>
      </>:""}
      

      <Paper variant="elevation" elevation={3} sx={{position:"fixed",bottom:"0",left:"0",right:"0",padding:" 0 0 1em ",alignItems:"center"}}>
          {active === 5?"":<Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={active===1?33:0 || active===2?75:0 ||active===3?100:0}/>
          </Box>}

          <Container maxWidth="lg"sx={{display:"flex",alignItems:"center",marginTop:"1em"}}>
              <div style={{flexGrow:"1"}}>
                  <Typography variant="h6" color="initial">TOTAL : ₱1,150</Typography>
                  <Typography variant="subtitle2" color="initial" fontWeight={600}>Min. Payment of ₱400  </Typography>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                  <Button variant="text" onClick={()=> {if(active>1){setActive(active-1)}}}>
                      back
                  </Button>
                  {active===3?
                    <Button variant="contained" color="primary" href='Invoice'>
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