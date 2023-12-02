import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import MenuItem from '@mui/material/MenuItem';
import AccommodationCard from '../../../Components/AccommodationCard';
import dayjs from 'dayjs';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton'

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import useContent from '../../../Hooks/useContent';
import useAccommodation from '../../../Hooks/useAccommodation';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px",
    maxHeight:"90vh",
    overflowY:"scroll"
};

function Accommodation() {
  const [open, setOpen] = useState("");
  const { data: shifts, loading: shiftLoading, error: shiftError, getShift, updateShift } = useContent();
  const {data: accommodations, loading: accommodationLoading, error: accommodationError, getAccommodation} = useAccommodation();

  const [shiftVal,setShiftVal] = useState<any>({shifts})
  const [shiftForm, setShiftForm] = useState<any>({
    day: {
      start: "",
      end: ""
    },
    night: {
      start:"",
      end: ""
    },
    whole: {
      start: "",
      end: ""
    }
  })

  const clear = () => {
    // Close Modal
    setOpen("")
  }

  useEffect(() => {
    getAccommodation();
    getShift();
    // setShiftForm(shifts)
  }, []);

  useEffect(()=>{
    setShiftForm({
      day: {
        start: dayjs(shifts?.shift?.day?.start),
        end: dayjs(shifts?.shift?.day?.end),
      },
      night: {
        start: dayjs(shifts?.shift?.night?.start),
        end: dayjs(shifts?.shift?.night?.end),
      },
      whole: {
        start: dayjs(shifts?.shift?.whole?.start),
        end: dayjs(shifts?.shift?.whole?.end),
      },
    });
  },[shiftLoading])

  const handleUpdateShift: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // Update Shift
    await updateShift(shiftForm);
    // refresh value
    
    await getShift();

    window.location.reload()
    // Clear Form
    clear()
    

    
  }
    
  // Make the date val to date appealing for UI
  const timestampToTime = (timestamp:string) =>{
    return dayjs(timestamp).format('h:mm A')
  }

  if (accommodationLoading || shiftLoading ) {
  
    return <Typography>Loading...</Typography>
  }
  
  return <>
    <div>
      <Typography variant="h4" fontWeight={600} color="primary">Manage Accommodations</Typography>
      <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of all Accommodation</Typography>
      <Box display="flex" sx={{margin:"2em 0 "}}>
          <Box sx={{flexGrow:"1",display:"flex"}}>
              <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".2em .2em .2em 1.2em" ,borderRadius:"1000px"}}>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Day Shift:</Typography>
                      <Typography variant="body1" color="initial">{timestampToTime(shifts?.shift?.day?.start)} to {timestampToTime(shifts?.shift?.day?.end)}</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Night Shift:</Typography>
                      <Typography variant="body1" color="initial">{timestampToTime(shifts?.shift?.night?.start)} to {timestampToTime(shifts?.shift?.night?.end)}</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Whole Day:</Typography>
                      <Typography variant="body1" color="initial">{timestampToTime(shifts?.shift?.whole?.start)} to {timestampToTime(shifts?.shift?.whole?.end)}</Typography>
                  </Box>
                  <IconButton aria-label="edit" onClick={()=>{setOpen("editShift")}}>
                      <ModeEditIcon/>
                  </IconButton>
              </Box>
          </Box>
          
          <Button variant="contained" color="primary" href='accommodation/add'>
              Add Accommodation
          </Button>
      </Box>
      <Box display="flex" flexDirection={"column"} gap={"10px"}>
        {accommodations?.map((accommodation: any) => (
          <AccommodationCard key={accommodation._id} accommodation={accommodation} variant="manage" openModal={setOpen}/>
        ))}
      </Box>
    </div>

    <Modal
          keepMounted
          open={!(open==="")}
          onClose={()=>{setOpen("")}}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {open === "editShift"?<>
              <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">Shift Time Availability</Typography>
              <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                Set shift time  
              </Typography>
              <form onSubmit={handleUpdateShift}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={600} color="initial">Day Shift </Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker 
                          defaultValue={dayjs(shifts?.shift?.day?.end)}
                          value={dayjs(shiftForm.day.start)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            day: {
                              ...shiftForm.day,
                              start: newValue
                            }
                          })}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={2} xs={12} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Typography variant="subtitle1" color="initial">to</Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker 
                          defaultValue={dayjs(shifts?.shift?.day?.end)}
                          value={dayjs(shiftForm.day.end)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            day: {
                              ...shiftForm.day,
                              end: newValue
                            }
                          })}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>


                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={600} color="initial">Night Shift </Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker
                          defaultValue={dayjs(shifts?.shift?.night?.start)}
                          value={dayjs(shiftForm.night.start)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            night: {
                              ...shiftForm.night,
                              start: newValue
                            }
                          })}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={2} xs={12} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Typography variant="subtitle1" color="initial">to</Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker
                          defaultValue={dayjs(shifts?.shift?.night?.end)}
                          value={dayjs(shiftForm.night.end)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            night: {
                              ...shiftForm.night,
                              end: newValue
                            }
                          })}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={600} color="initial">Whole Day</Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker 
                          defaultValue={dayjs(shifts?.shift?.whole?.start)}
                          value={dayjs(shiftForm.whole.start)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            whole: {
                              ...shiftForm.whole,
                              start: newValue
                            }
                          })}}/>
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={2} xs={12} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Typography variant="subtitle1" color="initial">to</Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker
                          defaultValue={dayjs(shifts?.shift?.whole?.end)}
                          value={dayjs(shiftForm.whole.end)}
                          onChange={(newValue)=>{setShiftForm({
                            ...shiftForm,
                            whole: {
                              ...shiftForm.whole,
                              end: newValue
                            }
                          })}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} padding={"1em 0"}>
                  </Grid>
                  <Grid item xs={5}>
                      <Button variant="text" fullWidth onClick={()=>{setOpen("")}} sx={{color:"black"}}>
                        back
                      </Button>
                  </Grid>
                  <Grid item xs={7}>
                      <Button variant="contained" color='primary' fullWidth type='submit'>
                          Confirm
                      </Button>
                  </Grid>
                </Grid>
              </form>
          </>:""}
        </Box>
    </Modal>
  </>
}

export default Accommodation