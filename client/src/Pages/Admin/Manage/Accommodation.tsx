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
    const { data: shifts, loading: shiftLoading, error: shiftError, getShift, updateShift } = useContent();

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

    const handleUpdateShift: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Update Shift
      updateShift(shiftForm);

      // Clear Form
      clear()
    }
    
    useEffect(() => {
      getShift();
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

    // if (feeLoading || shiftLoading) {
    //   return <Typography>Loading...</Typography>
    // }

  return <>
    <div>
      <Typography variant="h4" fontWeight={600} color="primary">Manage Accommodations</Typography>
      <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of all Accommodation</Typography>
      <Box display="flex" sx={{margin:"2em 0 "}}>
          <Box sx={{flexGrow:"1",display:"flex"}}>
              <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".2em .2em .2em 1.2em" ,borderRadius:"1000px"}}>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Day Shift:</Typography>
                      <Typography variant="body1" color="initial">{shifts?.shift?.day?.start} to {shifts?.shift?.day?.end}</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Night Shift:</Typography>
                      <Typography variant="body1" color="initial">{shifts?.shift?.night?.start} to {shifts?.shift?.night?.end}</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Typography variant="subtitle2" fontWeight={600} color="initial">Whole Day:</Typography>
                      <Typography variant="body1" color="initial">{shifts?.shift?.whole?.start} to {shifts?.shift?.whole?.end}</Typography>
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
      <Box display="flex" gap={"10px"}>
          <AccommodationCard variant="manage" openModal={setOpen}/>
      </Box>
    </div>
  </>
}

export default Accommodation