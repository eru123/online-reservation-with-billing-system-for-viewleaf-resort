import React from 'react'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom';

type Props = { 
  additional:boolean;
  form?:any;
}

function BookingStatement({additional, form}:Props) {
  const {date, shift} = useParams();

  return <>
    <Timeline
      sx={{
          [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
          },
      }}
    >
    {form.accommodations?.map((accommodation:any)=>(<div>
      {/* One Accommodation */}
      <TimelineItem>

          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
              <Typography variant="body2" color="initial">{accommodation?.type.toUpperCase()}</Typography>

              {/* Accommodation */}
              <Box display="flex" sx={{marginBottom:"10px"}}>
                  <div style={{flexGrow:"1"}}>
                      <Typography variant="h5" fontWeight={500} color="initial">{accommodation?.title}</Typography>
                  </div>
                  <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{accommodation.fees[parseInt(shift||"0")].rate}</Typography>
              </Box>

              {/* Inclussions */}
              <Box >
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Inclusions</Typography>
                {accommodation?.inclusions?.map((inclusion:any)=>(
                  <>{ inclusion?.quantity > 0 ?
                    <Box display="flex" >
                      <div style={{flexGrow:"1"}}>
                          <Typography variant="subtitle1" fontWeight={500}  color="initial">{inclusion?.name}</Typography>
                          <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}> {inclusion?.quantity} x {inclusion?.price} </Typography>
                      </div> 
                      <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{inclusion?.quantity * inclusion?.price}</Typography>
                  </Box> : <></> }</>
                ))}
              </Box>

              {/* Entrance Fee */}
              <Box sx={{marginTop:"15px"}}>
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Entrance Fee</Typography>

                
              {accommodation?.guests?.adult ?
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Adult</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}> {accommodation.guests.adult} x {accommodation.fees[parseInt(shift||"0")].guestFee.adult} </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{accommodation.guests.adult * accommodation.fees[parseInt(shift||"0")].guestFee.adult} </Typography>
                </Box>
              :<></>}

              {accommodation?.guests?.children ? 
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Kids</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  {accommodation.guests.children} x {accommodation.fees[parseInt(shift||"0")].guestFee.kids} </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{accommodation.guests.children * accommodation.fees[parseInt(shift||"0")].guestFee.kids}</Typography>
                </Box>
              :<></>}

              {accommodation?.guests?.senior ? 
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Senior</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  {accommodation.guests.senior} x {accommodation.fees[parseInt(shift||"0")].guestFee.adult * .8} </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{accommodation.guests.adult * (accommodation.fees[parseInt(shift||"0")].guestFee.adult * .8)} </Typography>
                </Box>
              :<></>}

              {accommodation?.guests?.pwd ? 
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">PWD</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  {accommodation.guests.pwd} x {accommodation.fees[parseInt(shift||"0")].guestFee.adult * .8} </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{accommodation.guests.adult * (accommodation.fees[parseInt(shift||"0")].guestFee.adult * .8)} </Typography>
                </Box>
              :<></>}
                
                
              </Box>
              
          </TimelineContent>
      </TimelineItem>
    </div>))}
    </Timeline>
    <Box display="flex" flexDirection={"column"} alignItems={"end"} padding={"1em 2.2em"}>
      <Typography variant="h6" color="initial" fontWeight={700}><span style={{opacity:".5"}}>Total:</span> ₱1,150</Typography>
      {additional?"":<Typography variant="subtitle2" color="initial" style={{opacity:".5"}}>Min. Payment of ₱400  </Typography>}
      
    </Box>
  </>
}

export default BookingStatement