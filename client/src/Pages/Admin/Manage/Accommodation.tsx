import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import MenuItem from '@mui/material/MenuItem';
import AccommodationCard from '../../../Components/AccommodationCard';

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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px",
    maxHeight:"90vh",
    overflowY:"scroll"
};

function Accommodation() {
    const [open, setOpen] = useState("");
    const { data: fees, loading: feeLoading, error: feeError, getFee, updateFee } = useContent();
    const { data: shifts, loading: shiftLoading, error: shiftError, getShift, updateShift } = useContent();

    const [feeForm, setFeeForm] = useState<any>({
      kid: 0,
      adult: 0,
      senior: 0
    })

    const [shiftForm, setShiftForm] = useState<any>({
      day: {
        start: '',
        end: ''
      },
      night: {
        start: '',
        end: ''
      },
      whole: {
        start: '',
        end: ''
      }
    })

    const clear = () => {
      // Close Modal
      setOpen("")
    }

    const handleUpdateFee: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Update Fee
      updateFee(feeForm);

      // Clear Form
      clear()
    }

    const handleUpdateShift: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Update Shift
      updateShift(shiftForm);

      // Clear Form
      clear()
    }
    
    useEffect(() => {
      getFee();
      getShift();
      setFeeForm({
        kid: fees?.fee?.kid,
        adult: fees?.fee?.adult,
        senior: fees?.fee?.senior
      });
      setShiftForm({
        day: {
          start: shifts?.shift?.day?.start,
          end: shifts?.shift?.day?.end
        },
        night: {
          start: shifts?.shift?.night?.start,
          end: shifts?.shift?.night?.end
        },
        whole: {
          start: shifts?.shift?.whole?.start,
          end: shifts?.shift?.whole?.end
        }
      })
    }, [])

    if (feeLoading || shiftLoading) {
      return <Typography>Loading...</Typography>
    }

    return <>
        <div>
            <Typography variant="h4" fontWeight={600} color="primary">Manage Accommodations</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of all Accommodation</Typography>
            <Box display="flex" sx={{margin:"2em 0 "}}>
                <Box sx={{flexGrow:"1",display:"flex",gap:'10px'}}>
                    <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".5em .5em .5em 1.5em" ,borderRadius:"1000px"}}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Day Shift:</Typography>
                            <Typography variant="body1" color="initial">{shifts?.shift?.day?.start} to {shifts?.shift?.day?.end}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Night Shift:</Typography>
                            <Typography variant="body1" color="initial">{shifts?.shift?.night?.start} to {shifts?.shift?.night?.end}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Whole Day:</Typography>
                            <Typography variant="body1" color="initial">{shifts?.shift?.whole?.start} to {shifts?.shift?.whole?.end}</Typography>
                        </Box>
                        <IconButton aria-label="edit" onClick={()=>{setOpen("editShift")}}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Box>
                    <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".5em .5em .5em 1.5em",borderRadius:"1000px"}}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Kids Fee:</Typography>
                            <Typography variant="body1" color="initial">{fees?.fee?.kid}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Adult Fee:</Typography>
                            <Typography variant="body1" color="initial">{fees?.fee?.adult}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} color="initial">Senior / PWD Fee:</Typography>
                            <Typography variant="body1" color="initial">{fees?.fee?.senior}</Typography>
                        </Box>
                        <IconButton aria-label="edit" onClick={()=>{setOpen("editEntranceFee")}}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Box>
                </Box>
                
                <Button variant="contained" color="primary" onClick={()=>{setOpen("addAccommodation")}}>
                    Add Accommodation
                </Button>
            </Box>
            <Box display="flex" gap={"10px"}>
                <AccommodationCard variant="manage" openModal={setOpen}/>
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
                {open === "addAccommodation"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Add Accommodation
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"25px"}}>
                        Fill Up Accommodation Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item  md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                >
                                    <MenuItem value={10}>Room</MenuItem>
                                    <MenuItem value={20}>Cottage</MenuItem>
                                    <MenuItem value={30}>Pool</MenuItem>
                                    <MenuItem value={30}>Resort</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="pax"
                                label="Pax"
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="Title"
                                label="Title"
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="Description"
                                label="Description"
                                multiline
                                
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='file'
                                fullWidth
                                id="Description"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Day Shift Rate"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Night Shift Rate"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Whole Day Rate"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <hr style={{marginBottom:"1em"}}/>
                            <Typography variant="subtitle1" color="initial">Add Inclusion </Typography>
                        </Grid>
                        <Grid item md={5}  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="inclusionName"
                                label="Name"
                            />
                        </Grid>
                        <Grid item md={5}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="Price"
                                label="Price"
                            />
                        </Grid>
                        <Grid item md={2}  xs={12}>
                            <Button fullWidth variant="contained" color="primary" sx={{height:"100%"}}>
                                Add
                            </Button>
                        </Grid>
                        <Grid item  xs={12}>
                            <Box display="flex" gap={"1em"} >
                                <Chip label="Towel (100) " variant="outlined" onDelete={()=>{}} />
                                <Chip label="Slippers (150) " variant="outlined" onDelete={()=>{}} />
                            </Box>
                        </Grid>
                        <Grid item  xs={12} sx={{margin:"2em"}}>
                            
                        </Grid>
                        <Grid item  xs={4}>
                            <Button variant="text" color="primary" fullWidth onClick={()=>setOpen("")}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item  xs={8}>
                            <Button variant="contained" color="primary" fullWidth>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open === "editAccommodation"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Edit Accommodation
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"25px"}}>
                        Fill Up Accommodation Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item  md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                >
                                    <MenuItem value={10}>Room</MenuItem>
                                    <MenuItem value={20}>Cottage</MenuItem>
                                    <MenuItem value={30}>Pool</MenuItem>
                                    <MenuItem value={30}>Resort</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="pax"
                                label="Pax"
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="Title"
                                label="Title"
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="Description"
                                label="Description"
                                multiline
                                
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                type='file'
                                fullWidth
                                id="Description"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Day Shift Rate"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Night Shift Rate"
                            />
                        </Grid>
                        <Grid item md={4}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="dayRate"
                                label="Whole Day Rate"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <hr style={{marginBottom:"1em"}}/>
                            <Typography variant="subtitle1" color="initial">Add Inclusion </Typography>
                        </Grid>
                        <Grid item md={5}  xs={12}>
                            <TextField
                                type='text'
                                fullWidth
                                id="inclusionName"
                                label="Name"
                            />
                        </Grid>
                        <Grid item md={5}  xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="Price"
                                label="Price"
                            />
                        </Grid>
                        <Grid item md={2}  xs={12}>
                            <Button fullWidth variant="contained" color="primary" sx={{height:"100%"}}>
                                Add
                            </Button>
                        </Grid>
                        <Grid item  xs={12}>
                            <Box display="flex" gap={"1em"} >
                                <Chip label="Towel (100) " variant="outlined" onDelete={()=>{}} />
                                <Chip label="Slippers (150) " variant="outlined" onDelete={()=>{}} />
                            </Box>
                        </Grid>
                        <Grid item  xs={12} sx={{margin:"2em"}}>
                            
                        </Grid>
                        <Grid item  xs={4}>
                            <Button variant="text" color="primary" fullWidth onClick={()=>setOpen("")}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item  xs={8}>
                            <Button variant="contained" color="primary" fullWidth>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </>:""}
                {open === "editEntranceFee"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Edit Entrance Fee
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"25px"}}>
                        Swimming Pool
                    </Typography>
                    <form onSubmit={handleUpdateFee}>
                    <Grid container spacing={2}>
                      
                        <Grid item  md={4} xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="kids"
                                label="Kids"
                                defaultValue={fees?.fee?.kid}
                                onChange={(e)=>setFeeForm({...feeForm, kid: e.target.value})}
                            />
                        </Grid>
                        <Grid item  md={4} xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="adult"
                                label="Adult"
                                defaultValue={fees?.fee?.adult}
                                onChange={(e)=>setFeeForm({...feeForm, adult: e.target.value})}
                            />
                        </Grid>
                        <Grid item  md={4} xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                id="seniorPwd"
                                label="Senior / PWD"
                                defaultValue={fees?.fee?.senior}
                                onChange={(e)=>setFeeForm({...feeForm, senior: e.target.value})}
                            />
                        </Grid>

                        <Grid item  xs={12} sx={{margin:"2em"}}>
                            
                        </Grid>
                        <Grid item  xs={4}>
                            <Button variant="text" color="primary" fullWidth onClick={()=>setOpen("")}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item  xs={8}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Update
                            </Button>
                        </Grid>
                     
                    </Grid>
                    </form>
                </>:""}
                {open === "editShift"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Edit Shift Schedule
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"25px"}}>
                        
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item   xs={12}>
                            <Typography variant="subtitle1" color="initial">Day Shift</Typography>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="Start"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="End"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item   xs={12}>
                            <Typography variant="subtitle1" color="initial">Night Shift</Typography>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="Start"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="End"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item   xs={12}>
                            <Typography variant="subtitle1" color="initial">Whole Day Shift</Typography>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="Start"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item  md={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker label="End"   sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item  xs={12} sx={{margin:"2em"}}>
                            
                        </Grid>
                        <Grid item  xs={4}>
                            <Button variant="text" color="primary" fullWidth onClick={()=>setOpen("")}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item  xs={8}>
                            <Button variant="contained" color="primary" fullWidth>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </>:""}
            </Box>
        </Modal>
    </>
}

export default Accommodation