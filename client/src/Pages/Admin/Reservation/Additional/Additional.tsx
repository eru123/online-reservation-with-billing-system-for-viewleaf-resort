import React,{useState} from 'react'
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

function Additional() {
    const [step,setStep] = useState(1);
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