import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Section1Img from '../Images/Resources/Section1BG.jpg'
import Section2Img from '../Images/Resources/Section2BG.jpg'
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
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMore from '@mui/icons-material/ExpandMore'
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import logoDrop from '../Images/LogoDrop.png'
// lAYOUTS
import Footer from '../Layouts/Footer/Footer'





function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}
function LandingPage() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
            cols: 2,
        },
    ];
    return (
        <div>
            <Box position="relative" height="400px" sx={{ backgroundImage: "url('../Images/Resources/Section1BG.jpg')", backgroundSize: "cover",overflow:"hidden",marginTop:"80px"}}>
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
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker slotProps={{ textField: { fullWidth: true } }}/>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField id="shift" label="Shift" fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Book Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <div style={{margin:"4em 0"}}>
                    <Typography variant="h5" color="primary" style={{marginBottom:"15px"}} align='center' fontWeight={600}>Gallery</Typography>
                    <ImageList
                        sx={{ width: "100%"}}
                        variant="masonry"
                        cols={4}
                        rowHeight={121}
                        >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div style={{margin:"4em 0"}}>
                    <Typography variant="h5" color="primary" style={{marginBottom:"40px"}} align='center' fontWeight={600}>Accommodation to Offer</Typography>
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
                        <a href="#"> <Typography variant="body1" color="white">About Us</Typography></a>
                        <a href="#"> <Typography variant="body1" color="white">Contact Us</Typography></a>
                        <a href="#"> <Typography variant="body1" color="white">Accommodation</Typography></a>
                        <a href="#"> <Typography variant="body1" color="white">Policy</Typography></a>
                        <a href="#"> <Typography variant="body1" color="primary">Book</Typography></a>
                    </div>
                    <Typography variant="subtitle1" color="white" style={{opacity:".6"}}>©2023 View Leaf Resort</Typography>
                </Container>
            </div>
        </div>
    )
}

export default LandingPage