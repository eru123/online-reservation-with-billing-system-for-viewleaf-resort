import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import AccommodationCard from '../../../../Components/AccommodationCard';
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
import Accommodation from './Accommodation';

import { useParams } from 'react-router-dom';
import useReservation from '../../../../Hooks/useReservation';

type Accommodation = {
  title: string;
  description: string;
  pax: string;
  image: string;
  fees: Array<{
    shift: string;
    rate: string;
    guestFee: {
      adult: number;
      kids: number;
    };
  }>;
  type: string;
  availability: string;
  inclusions: Array<{
    accommodationId: string;
    name: string;
    price: number;
  }>;
  accommodationId: string;
  createdAt: string;
  updatedAt: string;
};

type Invoice = {
  invoices: Array<{
    accommodation: Accommodation;
  }>;
};

function Additional() {
  const {id} = useParams();
  const [step,setStep] = useState(1);
  const {data: reservation, loading, error, getReservation, updateReservation, rescheduleReservation, extrasReservation} = useReservation();
  const [form, setForm] = useState<any>({
    shift: "0",
    schedule: new Date()
  });

  // const extractAccommodations = () => {
  //   if (reservation) {
  //     return reservation[0].accommodations
  //   }
  // }

  const updateSchedule = (date: any, shift: any) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      schedule: parseInt(date||""),
      shift: shift==="0"? "day": shift==="1"? "night": "whole day"
    }));
  }

  const selectAccommodation = (accommodationData: any) => {
    // Add shift property to the accommodationData
    const modifiedAccommodationData = { ...accommodationData, shift: form.shift==="0"? "day": form.shift==="1"? "night": "whole day" };
  
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

  const extractAccommodations = (data: Invoice[]): Accommodation[] => {
    const accommodations: Accommodation[] = [];
  
    data.forEach((invoice) => {
      if (invoice.invoices && invoice.invoices.length > 0) {
        invoice.invoices.forEach((inv) => {
          if (inv.accommodation) {
            accommodations.push(inv.accommodation);
          }
        });
      }
    });
  
    console.log(accommodations);
    return accommodations;
  };

  useEffect(()=>{

    if (reservation) {

      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        reservationId: reservation[0].reservationId,
        shift: reservation[0].invoices[0].shift,
        // accommodations: reservation[0].invoices,
        accommodations: reservation[0].invoices.map((invoice: any) => (
          invoice.accommodation
        )),
      }));

    } 
    else {
      getReservation({
        reservationId: id
      })
    }

    console.log(form)

  }, [reservation])

    return (
        
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
                <Accommodation/>
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
                        <Button variant="contained" color="primary" href='/admin/reservation/view'>
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
            
        </Container>
    )
}

export default Additional