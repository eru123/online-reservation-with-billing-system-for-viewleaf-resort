import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AccommodationCard from '../../../../Components/AccommodationCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TESTCalendar from '../../../../Components/TESTCalendar';
import Checkbox from '@mui/material/Checkbox';
import QuantitySelector from '../../../../Components/QuantitySelector';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px"
};
function Accommodation() {

    const [open, setOpen] = React.useState("");

    const [calendarValue, setCalendarValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [shift, setShift] = React.useState('Night Shift');

    const [kidsEntranceFee,setKidsEntranceFee]= useState(0);
    const [adultEntranceFee,setAdultEntranceFee]= useState(0);
    const [senioerPwdEntranceFee ,setSenioerPwdEntranceFee]= useState(0);

    const [dayshift, setDayShift] = useState(false);
    const [nightShift, setNightShift] = useState(false);


    return <>
        {/* List of Selected */}
        
        <Box display="flex"  my={"20px"} gap={"10px"}>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    disabled
                    label="Date Schedule"   
                    value={calendarValue}
                    onChange={(newValue) => setCalendarValue(newValue)}
                />
            </LocalizationProvider>
            <FormControl sx={{width:"150px"}} disabled>
                <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shift}
                label="Shift"
                onChange={(event: SelectChangeEvent) => {
                    setShift(event.target.value as string);
                }}
                >
                <MenuItem value={"Day Shift"}>Day Shift</MenuItem>
                <MenuItem value={"Night Shift"}>Night Shift</MenuItem>
                <MenuItem value={"Whole Shift"}>Whole Shift</MenuItem>
                </Select>
            </FormControl>
        </Box>   
        <Box display="flex" flexDirection={"column"} gap={"25px"} >
            {/* If the accommodation is already book and wants additional */}
            <AccommodationCard variant="additional" openModal={setOpen}/>
            {/* If the accommodation just added to be the additional */}
            <AccommodationCard variant="selected" openModal={setOpen}/>
        </Box>

         {/*  List of Suggested Accommodation */}
        <Typography variant="h4" color="primary" mt={"3em"} fontWeight={600}>Suggested Accommodation</Typography>
        <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>List of all available accommodation</Typography>
        <Box display="flex" flexDirection={"column"} gap={"25px"} >
            <AccommodationCard variant="view" openModal={setOpen}/>
        </Box>
        




        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                {open === "setSchedule"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Set Schedule
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Specify the date you want to stay with us
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} sx={{display:"flex",flexDirection:"column",gap:"8px"}}>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",padding:".5em",border:"1px solid #A4A4A4",display:"flex",alignItems:"center",cursor:"pointer"}} onClick={()=>setDayShift(!(dayshift))}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h6" color="initial">Day Shift</Typography>
                                    <Typography variant="body2" color="initial">8 am - 12 pm</Typography>
                                </div>
                                <Checkbox
                                    checked={dayshift} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Paper>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",padding:".5em",border:"1px solid #A4A4A4",display:"flex",alignItems:"center",cursor:"pointer"}} onClick={()=>setNightShift(!(nightShift))}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h6" color="initial">Night Shift</Typography>
                                    <Typography variant="body2" color="initial">2 pm - 7 pm</Typography>
                                </div>
                                <Checkbox
                                    checked={nightShift} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",border:"1px solid #A4A4A4"}}>
                                <TESTCalendar/>
                            </Paper>
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                back
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open === "addAccomodation"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Add Accommodation
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Fill Up Accommodation Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} sx={{display:"flex",flexDirection:"column",gap:"8px"}}>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",padding:".5em",border:"1px solid #A4A4A4",display:"flex",alignItems:"center",cursor:"pointer"}} onClick={()=>setDayShift(!(dayshift))}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h6" color="initial">Day Shift</Typography>
                                    <Typography variant="body2" color="initial">8 am - 12 pm</Typography>
                                </div>
                                <Checkbox
                                    checked={dayshift} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Paper>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",padding:".5em",border:"1px solid #A4A4A4",display:"flex",alignItems:"center",cursor:"pointer"}} onClick={()=>setNightShift(!(nightShift))}>
                                <div style={{flexGrow:"1"}}>
                                    <Typography variant="h6" color="initial">Night Shift</Typography>
                                    <Typography variant="body2" color="initial">2 pm - 7 pm</Typography>
                                </div>
                                <Checkbox
                                    checked={nightShift} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Paper variant="elevation" elevation={3} sx={{borderRadius:"8px",border:"1px solid #A4A4A4"}}>
                                <TESTCalendar/>
                            </Paper>
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                back
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                
                </>:""}
            </Box>
        </Modal>
    </>
}

export default Accommodation