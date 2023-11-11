import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SampleImage1 from '../Images/Resources/SampleImage1.jpg';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import QuantitySelector from './QuantitySelector';
import Modal from '@mui/material/Modal';

import Checkbox from '@mui/material/Checkbox';

import TESTCalendar from './TESTCalendar'
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

type Props={
    variant: "selected"|"view"
}

function AccommodationCard({variant}:Props) {
    const[towel,setTowel] = useState(0);
    const [open, setOpen] = React.useState("");
    const [dayshift, setDayShift] = React.useState(false);
    const [nightShift, setNightShift] = React.useState(false);
    return (
        <div>
            <div style={{paddingBottom:"10px",backgroundColor:"#DADADA", borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>
                <Paper variant="elevation" elevation={3} sx={{borderRadius:"10px",overflow:"hidden"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{overflow:"hidden",display:"flex",justifyContent:"center", height:"100%",}}>
                            <img  src={SampleImage1} alt="" />
                        </Grid>
                        <Grid item xs={6} >
                            <Box sx={{padding:'1.2em 0'}}>
                                <Typography variant="subtitle2" color="initial" fontWeight={500}>COTTAGE</Typography>
                                <Typography variant="h5" color="Primary" fontWeight={600} >Duplex Renov delux</Typography>
                                <Typography variant="body2" color="initial"  textAlign={"justify"}>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.</Typography>
                                <Typography variant="subtitle2" color="initial" fontWeight={500} sx={{marginTop:"10px",opacity:'.6',marginBottom:"5px"}}>Inclusion</Typography>
                                <Box display="flex" sx={{flexWrap:"wrap",gap:"10px"}}>
                                    <Chip label="Towel" variant="outlined" />
                                    <Chip label="Mattress" variant="outlined" />
                                    <Chip label="Slipper" variant="outlined" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{padding:'1em 1em 1em 0',display:"flex",flexDirection:"column",height:"100%"}}>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"end",flexGrow:"1"}}>
                                    <FormControl sx={{ borderBottom: 'none' ,}}>
                                        <NativeSelect
                                            defaultValue={30}
                                            input={<InputBase name="shift" id="uncontrolled-native" />}
                                        >
                                            <option value={10}>Day Shift</option>
                                            <option value={20}>Night Shift</option>
                                        </NativeSelect>
                                    </FormControl>
                                    <Typography variant="h4" color="Primary" fontWeight={700} >₱4000</Typography>
                                    <Typography variant="subtitle2" color="inital" >for 8 pax</Typography>
                                </div>
                                <div style={{display:"flex",justifyContent:"end"}}>
                                    {(variant==="selected")?
                                        <Button variant="contained" color="primary">    
                                            Unbook
                                        </Button>
                                        :
                                        <Button variant="contained" color="primary" onClick={()=>{setOpen("setSchedule")}}>    
                                            Book
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Grid>
                        
                    </Grid>
                </Paper>
            </div>
            {(variant==="selected")?<>
                <div style={{background:"#DADADA",padding:"1em",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px"}}>
                    <Typography variant="h5" fontWeight={600} color="primary">Manage Inclusion</Typography>
                    <Typography variant="subtitle1" color="initial">You can add inclussion to be included to your accommodation</Typography>
                    <div>
                        <QuantitySelector name={"Towel"} value={towel} pricePerItem={500} setValue={setTowel}/>
                        <QuantitySelector name={"Towel"} value={towel} pricePerItem={500} setValue={setTowel}/>
                        <QuantitySelector name={"Towel"} value={towel} pricePerItem={500} setValue={setTowel}/>
                    </div>
                </div>
            </>:""}

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
                </Box>
            </Modal>
        </div>
    )
}

export default AccommodationCard