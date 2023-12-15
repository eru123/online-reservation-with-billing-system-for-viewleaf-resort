import React, { useState,useEffect } from 'react'

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
import { useNavigate } from 'react-router-dom'

// Components
import AccommodationCard from '../Components/AccommodationCard';
import AccordionFAQ from '../Components/AccordionFAQ'

// Images 
import logoDrop from '../Images/LogoDrop.png';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Section1Img from '../Images/Resources/Section1BG.jpg';
import Section2Img from '../Images/Resources/Section2BG.jpg';

import useContent from '../Hooks/useContent'
import useFAQ from '../Hooks/useFAQ'
import useAccommodation from '../Hooks/useAccommodation'
import dayjs from 'dayjs'
import QuestionImg from "../Images/question.png"

import Chatbot from '../Components/Chatbot'

function LandingPage() {
  // Set utilities
  const navigate = useNavigate();

  // Set Hooks for data
  const {data: faqs, loading: faqLoading, error: faqError, getFAQ} = useFAQ();
  const {data: contents, loading: contentLoading, error: contentError, getContent} = useContent();
  const {data: accommodations,loading: accommodationLoading,getAccommodation} = useAccommodation();
  const [bookingSchedule, setBookingSchedule] = useState<any>({
    date : "",
    shift : "",
  });
  const[open,setOpen]=useState("");
  const [refNum, setRefNum] = useState("");
  
  const book = () => {
    console.log(bookingSchedule)
    navigate(`/booking/${new Date(bookingSchedule.date).getTime()}/${bookingSchedule.shift}`)
  }
  const timestampToTime = (timestamp:string) =>{
    return dayjs(timestamp).format('h:mm A')
  }
  useEffect(()=>{
    getFAQ();
    getContent();
    getAccommodation({
      all:true
    });
  }, [])

  if (faqLoading || contentLoading || accommodationLoading) return <p>Loading...</p>
  if (faqError || contentError) return <p>Error</p>

  return (
    <div id="home">
      <Chatbot/>
      <Box position="relative" height="400px" sx={{ backgroundImage: "url('../Images/Resources/Section1BG.jpg')", backgroundSize: "cover",overflow:"hidden"}}>
          <img src={Section1Img} alt="" width={"100%"}  style={{position:"absolute",top:"50%",transform:"translateY(-50%)",minHeight:"1000px"}}/>
          <Box position={"absolute"} height={"100%"} width={"100%"}  top="50%" sx={{transform:("translateY(-50%)"), background:"black",opacity:".56"}}>
              
          </Box>
          <Box  position="absolute" top="55%" left="50%" sx={{transform:("translate(-50%,-45%)")}}>
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
      <Container maxWidth="lg" sx={{padding:"4em 0"}} id="about">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" color="primary" style={{marginBottom:"20px"}} fontWeight={600}>About Us</Typography>
            <Typography variant="body1" color="initial" textAlign={"justify"}lineHeight={"1.9em"} onClick={()=>{console.log(contents.about)}}>
              {contents?.about}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper variant="elevation" elevation={3} style={{padding:"1em",width:"100%"}}>
              <Typography variant="h6" color="primary" style={{marginBottom:"20px"}}>Book Now</Typography>
              <form onSubmit={book}>
                <Grid container spacing={2}>
                  <Grid item md={7} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker 
                        slotProps={{ 
                          textField: { fullWidth: true ,required:true} ,
                        }}
                        minDate={dayjs().add(1, 'day')}
                        onChange={(newDate) => setBookingSchedule({ ...bookingSchedule, date: newDate })}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-label">shift</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bookingSchedule.shift}
                        label="Shift"
                        onChange={(e) => setBookingSchedule({ ...bookingSchedule, shift: e.target.value })}
                      >
                        <MenuItem value={"0"}>Day Shift</MenuItem>
                        <MenuItem value={"1"}>Night Shift</MenuItem>
                        <MenuItem value={"2"}>Whole Shift</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant="body1" color="primary" textAlign={"center"} mt={2}>
                      {bookingSchedule.shift === "0"?<>
                        Day Shift is from {timestampToTime(contents?.shift.day.start)} to {timestampToTime(contents?.shift.day.end)}
                      </> :""}
                      {bookingSchedule.shift === "1"?<>
                        Night Shift is from {timestampToTime(contents?.shift.night.start)} to {timestampToTime(contents?.shift.night.end)}
                      </> :""}
                      {bookingSchedule.shift === "2"?<>
                        Whole Day Shift is from {timestampToTime(contents?.shift.whole.start)} to {timestampToTime(contents?.shift.whole.end)}
                      </> :""}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth type='submit' >
                      Book Now
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  let cleanedRefNum = refNum;

                  // Check if the first character is #
                  if (refNum.charAt(0) === '#') {
                    // Remove the # from the refNum
                    cleanedRefNum = refNum.substring(1);
                  }

                  // Navigate to the cleaned reference number
                  navigate(`/reservation/${cleanedRefNum}`);
                }}>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} display={"flex"} alignItems={"center"} gap={"10px"}>
                    <hr style={{flexGrow:"1"}}/>
                    <Typography  variant="subtitle1" color="initial">Have Reservation?</Typography>
                    <hr style={{flexGrow:"1"}}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" gap={"15px"}>
                      <TextField
                        required
                        fullWidth
                        id="refID"
                        placeholder='Reference ID'
                        onChange={(e)=> setRefNum(e.target.value)}
                      />
                      <Button variant="contained" color="primary" type='submit'>
                        Check
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <div style={{margin:"4em 0"}} id='accommodation'>
          <Typography variant="h5" color="primary" style={{marginBottom:"15px"}} align='center' fontWeight={600}>Gallery</Typography>
          {Array.isArray(accommodations) && !(accommodations.length <=0)?<>
            <ImageList sx={{ width: "100%"}} cols={3} >
              {accommodations?.map((accommodation: any) => (
                <ImageListItem key={accommodation?.accommodationId}>
                  <img
                      src={accommodation?.image}
                      alt={accommodation?.title}
                      loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>:<>
            <Box display="flex" flexDirection={"column"} gap={"25px"} width={"100%"}  sx={{opacity:".5"}} height={"400px"}  alignItems={"center"} justifyContent={"center"}>
              <img src={QuestionImg} alt="" />
              <Typography variant="subtitle2" color="initial" >There's no images</Typography>
            </Box>
          </>}
        </div>

        <div style={{margin:"4em 0"}}>
            <Typography variant="h5" color="primary" style={{marginBottom:"40px"}} align='center' fontWeight={600}>Accommodations</Typography>
            {Array.isArray(accommodations) && !(accommodations.length <=0)?<>
              <Box display="flex" flexDirection={"column"} gap={"15px"}>
                {accommodations?.map((accommodation: any) => {
                  if (accommodation.availability !== "unavailable") {
                    return <AccommodationCard key={accommodation._id} accommodation={accommodation} variant="display" openModal={setOpen}/>
                  }
              })}
              </Box>
            </>:<>
              <Box display="flex" flexDirection={"column"} gap={"25px"} width={"100%"}  sx={{opacity:".5"}} height={"400px"}  alignItems={"center"} justifyContent={"center"}>
                <img src={QuestionImg} alt="" />
                <Typography variant="subtitle2" color="initial" >Currently there's no accommodation registered</Typography>
              </Box>
            </>}
            
        </div>
        {Array.isArray(faqs) && !(faqs.length <=0)?<>
          <div style={{margin:"4em 0"}}>
            <Typography variant="h5" color="primary" style={{marginBottom:"40px"}} align='center' fontWeight={600}>Frequently Ask Question</Typography>
            {Array.isArray(faqs) && faqs?.map((faq: any) => (
              <AccordionFAQ question= {faq?.question} answer={faq?.answer}/>
            ))}
        </div>
        </>:""}
      </Container>
      <div style={{position:"relative",overflow:"hidden"}} id='contact'>
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
                            {contents?.email}
                          </Typography>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                          <CallIcon sx={{fill:"white"}}/>
                          <Typography variant="body2" color="white">
                            (+63)  {contents?.phone}
                          </Typography>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                          <FmdGoodIcon sx={{fill:"white"}}/>
                          <Typography variant="body2" color="white">
                            {contents?.address}
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