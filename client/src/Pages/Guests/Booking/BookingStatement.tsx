import React from 'react'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box'







function BookingStatement() {
  return <>
    <Timeline
      sx={{
          [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
          },
      }}
    >
      {/* One Accommodation */}
      <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
              <Typography variant="body2" color="initial">COTTAGE</Typography>

              {/* Accommodation */}
              <Box display="flex" sx={{marginBottom:"10px"}}>
                  <div style={{flexGrow:"1"}}>
                      <Typography variant="h5" fontWeight={500} color="initial">Duplex Renov A </Typography>
                  </div>
                  <Typography variant="h6" color="initial" sx={{opacity:".6"}}>300</Typography>
              </Box>


              {/* Inclussions */}
              <Box >
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Inclussions</Typography>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="subtitle1" fontWeight={500}  color="initial">Mattress</Typography>
                        <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="subtitle1" fontWeight={500}  color="initial">Towel</Typography>
                        <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="subtitle1" fontWeight={500}  color="initial">Slippers</Typography>
                        <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
              </Box>

              {/* Entrance Fee */}
              <Box sx={{marginTop:"15px"}}>
                <Typography variant="h6" fontWeight={600} color="initial" sx={{opacity:".6"}}>Entrance Fee</Typography>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                      <Typography variant="subtitle1" fontWeight={500}  color="initial">Mattress</Typography>
                      <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="subtitle1" fontWeight={500}  color="initial">Towel</Typography>
                        <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
                <Box display="flex" >
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="subtitle1" fontWeight={500}  color="initial">Slippers</Typography>
                        <Typography variant="body2"   color="initial" sx={{opacity:".6",paddingLeft:"1em"}}>  1 x 100 </Typography>
                    </div> 
                    <Typography variant="h6" color="initial" sx={{opacity:".6"}}>100</Typography>
                </Box>
              </Box>
              
          </TimelineContent>
      </TimelineItem>
    </Timeline>
    <Box display="flex" flexDirection={"column"} alignItems={"end"} padding={"1em 2.2em"}>
      <Typography variant="h6" color="initial" fontWeight={700}><span style={{opacity:".5"}}>Total:</span> ₱1,150</Typography>
      <Typography variant="subtitle2" color="initial" style={{opacity:".5"}}>Min. Payment of ₱400  </Typography>
    </Box>
  </>
}

export default BookingStatement