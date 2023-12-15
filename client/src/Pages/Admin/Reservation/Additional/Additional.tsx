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

import { useParams, useNavigate } from 'react-router-dom';
import useReservation from '../../../../Hooks/useReservation';
import useContent from '../../../../Hooks/useContent';

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
  const navigate = useNavigate();
  const [step,setStep] = useState(1);
  const {data: reservation, loading: reservationLoading, error, getReservation, updateReservation, rescheduleReservation, extrasReservation} = useReservation();
  const {data:content, loading:contentLoading, error:contentError, getContent} = useContent();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<any>({
    shift: "day",
    schedule: new Date()
  });

  const submit = async () => {
    await filterAccommodations();
    setSubmitted(true);
    
  }

  const getShiftIndex = (shift: string) => {
    switch(shift){
      case 'day':
        return 0;
      case 'night':
        return 1;
      case 'whole day':
        return 2;
      default:
        return 0;
    }
  }

  const filterAccommodations = async () => {
    // Assuming form is a state variable
    setForm((prevForm:any) => {
      const updatedAccommodations = prevForm.accommodations.filter((accommodation:any) => {
        // Check if guests and combined inclusions quantity are not zero
        const hasGuests = accommodation.guests && accommodation.guests.adult > 0;
        const hasInclusions = accommodation.inclusions.some((inclusion:any) => inclusion.quantity > 0);
  
        return hasGuests || hasInclusions;
      });
  
      // Update the state with the filtered accommodations
      return {
        ...prevForm,
        accommodations: updatedAccommodations,
      };
    });
  
    // No need to return a Promise here; the state update is synchronous
  };

  const selectAccommodation = (accommodationData: any) => {
    // Add shift property to the accommodationData
    const modifiedAccommodationData = { ...accommodationData, shift: form.shift };
  
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

        minimum += parseInt(accommodation.fees[getShiftIndex(form.shift)].rate)
        minimumAll += parseInt(accommodation.fees[getShiftIndex(form.shift)].rate)

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
              guests += parseInt(accommodation.guests.adult) * parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult)
              guestsAll += parseInt(accommodation.guests.adult) * parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult)
            }
            if(accommodation.guests.kids) {
              guests += parseInt(accommodation.guests.kids) * parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.kids)
              guestsAll += parseInt(accommodation.guests.kids) * parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.kids)
            }
            if(accommodation.guests.senior) {
              guests += parseInt(accommodation.guests.senior) * (parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult) * 0.8)
              guestsAll += parseInt(accommodation.guests.senior) * (parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult) * 0.8)
            }
            if(accommodation.guests.pwd) {
              guests += parseInt(accommodation.guests.pwd) * (parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult) * 0.8)
              guestsAll += parseInt(accommodation.guests.pwd) * (parseInt(accommodation.fees[getShiftIndex(form.shift)].guestFee.adult) * 0.8)
            }

            total = minimum +  inclusions + guests
            
          }

        return {
          ...accommodation,
          total: content?.promo === 0 ? total : total * ((100 - content?.promo) / 100) ,
          minimum: content?.promo === 0 ? minimum : minimum * ((100 - content?.promo) / 100)
        }

      }),
      costs: {
        total: content?.promo === 0 ? (minimumAll +  inclusionsAll + guestsAll) : (minimumAll +  inclusionsAll + guestsAll) * ((100 - content?.promo) / 100) ,
        guests: content?.promo === 0 ? guestsAll : guestsAll * ((100 - content?.promo) / 100) ,
        inclusions: content?.promo === 0 ? inclusionsAll : inclusionsAll * ((100 - content?.promo) / 100),
        accommodations: content?.promo === 0 ? minimumAll : minimumAll * ((100 - content?.promo) / 100)
      },
    }));
  }

  useEffect(()=>{
    if(submitted){
      extrasReservation(form);
      alert("Submitted!")
      navigate(`/admin/invoice/${id}`)
    }
  }, [submitted])

  useEffect(()=>{
    if (!reservation) {
      getReservation({
        reservationId: id
      })
    }
    if (!content){
      getContent();
    }
  }, [])

  useEffect(()=>{

    calculateCosts()

    if (reservation && form?.accommodations?.length ===0) {
      setForm((prevForm: { accommodations: any }) => ({
        ...prevForm,
        schedule: new Date(reservation[0].schedule).getTime(),
        reservationId: reservation[0].reservationId,
        shift: reservation[0].invoices[0].shift,
        accommodations: reservation[0].invoices.map((invoice: any) => ({
          ...invoice.accommodation,
          shift: reservation[0].invoices[0].shift,
          inclusions: invoice.accommodation.inclusions.map((inclusion: any) => ({
            ...inclusion,
            quantity: 0, // Set the quantity to 0 for each inclusion
          })),
        })),
      }));
    }

    // console.log(form)

  }, [form])

  if (reservationLoading || contentLoading) {
    return <div>Loading...</div>;
  }

    return (
        
        <Container maxWidth="lg">
            {step===1?<>
                <Box display="flex" alignItems={"center"} sx={{marginTop:"50px",marginBottom:"2em"}}>
                    <div style={{flexGrow:'1'}}>
                        <Typography variant="h4" fontWeight={600} color="primary">Select Accommodation</Typography>
                        <Typography variant="h6" fontWeight={400} color="initial" >You can choose multiple accommodation</Typography>
                    </div>
                    <Box display="flex" gap={"10px"}>
                        {/* <Button variant="text" color="primary">
                            Back
                        </Button> */}
                        <Button 
                          variant="contained" 
                          color="primary" 
                          // onClick={()=>{setStep(2)}}
                          onClick={submit}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
                <Accommodation
                  form={form}
                  selectAccommodation={selectAccommodation}
                  editGuests={editGuests}
                  addInclusion={addInclusion}
                />
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
                        <Button 
                          variant="contained" 
                          color="primary" 
                          // href='/admin/reservation/view'
                          onClick={submit}
                        >
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