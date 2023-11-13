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


type Props={
    variant: "selected"|"view"|"manage"|"additional"
    openModal : React.Dispatch<React.SetStateAction<string>>
}

function AccommodationCard({variant,openModal}:Props) {
    const [towel,setTowel] = useState(0);
    const [slippers ,setSlippers] = useState(0);
    const [mattress ,setMattress] = useState(0);

    
    

    return <>
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
                                    {variant === "additional"?"": <>
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
                                    </>}
                                </div>
                                <div style={{display:"flex",justifyContent:"end"}}>
                                    {(variant==="selected")?
                                        <Button variant="contained" color="primary">    
                                            Unbook
                                        </Button>
                                        :""
                                    }
                                    {(variant==="view")?
                                        <Button variant="contained" color="primary" onClick={()=>{}}>    
                                            Book
                                        </Button>
                                    :""}
                                    {(variant==="manage")?
                                        <Button variant="contained" color="primary" onClick={()=>{openModal("editAccommodation")}}>    
                                            Edit
                                        </Button>
                                    :""}
                                    
                                </div>
                            </div>
                        </Grid>
                        
                    </Grid>
                </Paper>
            </div>
            {(variant==="selected" ||variant === "additional")?<>
                <div style={{background:"#DADADA",padding:"1em",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px"}}>
                    <Typography variant="h5" fontWeight={600} color="primary">Manage Inclusion</Typography>
                    <Typography variant="subtitle1" color="initial">You can add inclussion to be included to your accommodation</Typography>
                    <div>
                        <QuantitySelector name={"Towel"} value={towel} pricePerItem={100} setValue={setTowel}/>
                        <QuantitySelector name={"Slippers"} value={slippers} pricePerItem={150} setValue={setSlippers}/>
                        <QuantitySelector name={"Mattress"} value={mattress} pricePerItem={500} setValue={setMattress}/>
                    </div>
                </div>
            </>:""}
        </div>
    </>

}

export default AccommodationCard