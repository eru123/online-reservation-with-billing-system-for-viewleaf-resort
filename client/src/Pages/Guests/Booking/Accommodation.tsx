import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AccommodationCard from '../../../Components/AccommodationCard'

import dayjs, { Dayjs } from 'dayjs';


import useAccommodation from '../../../Hooks/useAccommodation'

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

type Props = { 
  date?:string;
  shift?:string;
  form?: any;
  updateSchedule?: any;
  updateCustomer?: any;
  selectAccommodation?: any;
  editGuests?: any;
  addInclusion?: any;
}

function Accommodation({
  date, 
  shift,
  form,
  updateSchedule,
  updateCustomer,
  selectAccommodation,
  editGuests,
  addInclusion
}:Props) {
  const [open, setOpen] = React.useState("");

  const [calendarValue, setCalendarValue] = React.useState<Dayjs | null>(dayjs());
  // const [shift, setShift] = React.useState('');

  const [kidsEntranceFee,setKidsEntranceFee]= useState(0);
  const [adultEntranceFee,setAdultEntranceFee]= useState(0);
  const [senioerPwdEntranceFee ,setSenioerPwdEntranceFee]= useState(0);

  const [dayshift, setDayShift] = useState(false);
  const [nightShift, setNightShift] = useState(false);

  const {data:accommodations, getAccommodation} = useAccommodation();

  useEffect(()=>{
    getAccommodation({
      schedule: parseInt(date||"", 10),
      shift: shift==="1"? "day": shift==="2"? "night": "whole day"
    })
  }, [])

  return <>
    {/* <Box display="flex"  my={"20px"} gap={"10px"}>  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              label="Date Schedule" 
              minDate={dayjs()}   
              value={calendarValue}
              
              onChange={(newValue) => setCalendarValue(newValue)}
          />
      </LocalizationProvider>
      <FormControl sx={{width:"150px"}}>
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
    </Box>    */}

    {/* List of Selected */}
    <Box display="flex" flexDirection={"column"} gap={"25px"} >
      {form.accommodations?.map((accommodation: any) => (
        <AccommodationCard 
          accommodation={accommodation}
          variant="selected" 
          openModal={setOpen}
          selectAccommodation={selectAccommodation}
          addInclusion={addInclusion}
          editGuests={editGuests}
        />
      ))}
      
    </Box>

    {/*  List of Suggested Accommodation */}
    <Typography variant="h4" color="primary" mt={"3em"} fontWeight={600}>Suggested Accommodation</Typography>
    <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>List of all available accommodation</Typography>
    <Box display="flex" flexDirection={"column"} gap={"25px"} >
      {accommodations?.map((accommodation: any) => (
        <AccommodationCard 
          accommodation={accommodation} 
          variant="view" 
          openModal={setOpen}
          selectAccommodation={selectAccommodation}
        />
      ))}
    </Box>
  </>
}

export default Accommodation