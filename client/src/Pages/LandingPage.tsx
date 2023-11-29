import React, { useState } from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Components
import AccommodationCard from '../Components/AccommodationCard';

// Images 
import logoDrop from '../Images/LogoDrop.png';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Section1Img from '../Images/Resources/Section1BG.jpg';
import Section2Img from '../Images/Resources/Section2BG.jpg';

import itemData from './_Test/itemData'

function LandingPage() {
    const [bookingSchedule, setBookingSchedule] = useState<any>({
      date : "",
      shift : "",
    });
    const [open, setOpen] = React.useState("");
   

    return (
        <div>
            <Box position="relative" height="400px" sx={{ backgroundImage: "url('../Images/Resources/Section1BG.jpg')", backgroundSize: "cover",overflow:"hidden"}}>
                <img src={Section1Img} alt="" width={"100%"}  style={{position:"absolute",top:"50%",transform:"translateY(-50%)",minHeight:"1000px"}}/>
                <Box position={"absolute"} height={"100%"} width={"100%"}  top="50%" sx={{transform:("translateY(-50%)"), background:"black",opacity:".56"}}>
                    
                </Box>
                <Box position="absolute" top="55%" left="50%" sx={{transform:("translate(-50%,-45%)")}}>
                    <Typography variant="h6" textAlign={"center"} fontWeight={400} color="white">
                        ---- WELCOME TO ----
                    </Typography>
                    <Typography variant="h3" textAlign={"center"} sx={{margin:"15px 0"}} fontWeight={700} color="white">
                        View Leaf Resort
                    </Typography>
                    <Typography variant="h6" textAlign={"center"} fontWeight={400} color="white">
                        Get a reservation with now
                    </Typography>
                </Box>
            </Box>
            <Container maxWidth="lg" sx={{padding:"4em 0"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" color="primary" style={{marginBottom:"20px"}} fontWeight={600}>About Us</Typography>
                        <Typography variant="body1" color="initial" textAlign={"justify"}lineHeight={"1.9em"}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper variant="elevation" elevation={3} style={{padding:"1em",width:"100%"}}>
                            <Typography variant="h6" color="primary" style={{marginBottom:"20px"}}>Book Now</Typography>
                            <Grid container spacing={2}>
                                <Grid item md={7} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker 
                                          slotProps={{ 
                                            textField: { fullWidth: true } 
                                          }}
                                          onChange={(newDate) => setBookingSchedule({ ...bookingSchedule, date: newDate })}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">shift</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={bookingSchedule.shift}
                                            label="shift"
                                            onChange={(e) => setBookingSchedule({ ...bookingSchedule, shift: e.target.value })}
                                        >
                                            <MenuItem value={"0"}>Day Shift</MenuItem>
                                            <MenuItem value={"1"}>Night Shift</MenuItem>
                                            <MenuItem value={"2"}>Whole Shift</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" fullWidth onClick={() => console.log(bookingSchedule)}>
                                        Book Now
                                    </Button>
                                </Grid>
                                <Grid item xs={12} display={"flex"} alignItems={"center"} gap={"10px"}>
                                    <hr style={{flexGrow:"1"}}/>
                                    <Typography  variant="subtitle1" color="initial">Have Reservation?</Typography>
                                    <hr style={{flexGrow:"1"}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" gap={"15px"}>
                                        <TextField
                                            fullWidth
                                            id="refID"
                                            placeholder='Reference ID'
                                        />
                                        <Button variant="contained" color="primary" href='invoice'>
                                            Check
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <div style={{margin:"4em 0"}}>
                    <Typography variant="h5" color="primary" style={{marginBottom:"15px"}} align='center' fontWeight={600}>Gallery</Typography>
                    <ImageList sx={{ width: "100%"}} cols={4} >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                            <img
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div style={{margin:"4em 0"}}>
                    <Typography variant="h5" color="primary" style={{marginBottom:"40px"}} align='center' fontWeight={600}>Accommodation to Offer</Typography>


                    <Box display="flex" flexDirection={"column"} gap={"15px"}>
                        <AccommodationCard variant="view" openModal={setOpen}/>
                        <AccommodationCard variant="view" openModal={setOpen}/>
                        <AccommodationCard variant="view" openModal={setOpen}/>
                    </Box>
                </div>
                <div style={{margin:"4em 0"}}>
                    <Typography variant="h5" color="primary" style={{marginBottom:"40px"}} align='center' fontWeight={600}>Frequently Ask Question</Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-label="Expand"
                            aria-controls="-content"
                            id="-header"
                        >
                            <Typography variant='h6'>Question #1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body2' >is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-label="Expand"
                            aria-controls="-content"
                            id="-header"
                        >
                            <Typography variant='h6'>Question #1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body2' >is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-label="Expand"
                            aria-controls="-content"
                            id="-header"
                        >
                            <Typography variant='h6'>Question #1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body2' >is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div style={{marginTop:"4em"}}>
                    
                </div>
            </Container>
            <div style={{position:"relative",overflow:"hidden"}}>
                <img src={Section2Img} style={{position:"absolute", top:"50%",minHeight:"100%",transform:"translateY(-50%)",width:"100%",zIndex:"-25", }} alt="" />
                <div style={{position:"absolute",width:"100%",height:"100%",zIndex:"-24", background:"black",opacity:".89",}}>
                    
                </div>
                <Container maxWidth="lg" sx={{padding:"4em 0"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h5" color="primary"   fontWeight={600}>Contact Us</Typography>
                            <Typography variant="body1" color="white">
                                We are happy to reach out to your inquiries  
                            </Typography>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{display:"flex",flexDirection:"column", gap:"15px",alignItems:"start"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <EmailIcon sx={{fill:"white"}}/>
                                <Typography variant="body2" color="white">
                                    viewleaf@gmail.com
                                </Typography>
                            </div>
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <CallIcon sx={{fill:"white"}}/>
                                <Typography variant="body2" color="white">
                                    0915-232-3231
                                </Typography>
                            </div>
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <FmdGoodIcon sx={{fill:"white"}}/>
                                <Typography variant="body2" color="white">
                                    Marikina Heights, Marikina City
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div style={{background:"#181818",paddingBottom:"4em"}}>
                <Container maxWidth="lg" sx={{display:"flex",flexDirection:"column", gap:"40px",alignItems:"center"}}>
                    <img src={logoDrop} alt="" />
                    <Typography variant="h5" color="primary" fontWeight={600}>View Leaf Resort </Typography>
                    <div style={{display:"flex",gap:"25px"}}>
                        <a href="/#aboutUs"> <Typography variant="body1" color="white">About Us</Typography></a>
                        <a href="/#contactUs"> <Typography variant="body1" color="white">Contact Us</Typography></a>
                        <a href="/#accommodation"> <Typography variant="body1" color="white">Accommodation</Typography></a>
                        <a href="/policy"> <Typography variant="body1" color="white">Policy</Typography></a>
                        <a href="/#book"> <Typography variant="body1" color="primary">Book</Typography></a>
                    </div>
                    <Typography variant="subtitle1" color="white" style={{opacity:".6"}}>©2023 View Leaf Resort</Typography>
                </Container>
            </div>
        </div>
    )
}

export default LandingPage