import React from 'react'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box'


type Props = { 
  additional:boolean;
  selectedAccommodations?:any;
}

function BookingStatement({additional, selectedAccommodations}:Props) {

  console.log(selectedAccommodations)

  return <>
    <Timeline
      sx={{
          [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
          },
      }}
    >
    {selectedAccommodations?.map((accommodation:any)=>(<div>
      {/* One Accommodation */}
      <TimelineItem>

          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
              <Typography variant="body2" color="initial">{accommodation?.type}</Typography>

              {/* Accommodation */}
              <Box display="flex" sx={{marginBottom:"10px"}}>
                  <div style={{flexGrow:"1"}}>
                      <Typography variant="h5" fontWeight={500} color="initial">{accommodation?.title}</Typography>
                  </div>
                  <Typography variant="h6" color="initial" sx={{opacity:".6"}}>300</Typography>
              </Box>

              {/* Inclussions */}
              <Box >
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Inclusions</Typography>
                {accommodation?.inclusions?.map((inclusion:any)=>(
                  <Box display="flex" >
                      <div style={{flexGrow:"1"}}>
                          <Typography variant="subtitle1" fontWeight={500}  color="initial">{inclusion?.name}</Typography>
                          <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x {inclusion?.price} </Typography>
                      </div> 
                      <Typography variant="h6" color="initial" sx={{opacity:".6"}}>{inclusion?.price}</Typography>
                  </Box>
                ))}
                

              </Box>

              {/* Entrance Fee */}
              <Box sx={{marginTop:"15px"}}>
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Entrance Fee</Typography>

                
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Adult</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>

                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Kids</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>

                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Senior/PWD</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
                
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