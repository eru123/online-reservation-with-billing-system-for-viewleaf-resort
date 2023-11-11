import React from 'react'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventIcon from '@mui/icons-material/Event';


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
    </>
}

export default BookingStatement