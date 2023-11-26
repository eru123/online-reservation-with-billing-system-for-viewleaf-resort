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
                  <Grid container spacing={0}>
                      <Grid item md={3} xs={12}>
                        <img width={"100%"} height={"100%"} src={SampleImage1} alt="" />
                      </Grid>
                      <Grid item md={6} xs={9} sx={{padding:"1em"}}>
                          <Box >
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
                      <Grid item md={3} xs={3}>
                          <div style={{padding:'1em 1em 1em 0',display:"flex",flexDirection:"column",height:"100%"}}>
                              <div style={{display:"flex",flexDirection:"column",alignItems:"end",flexGrow:"1"}}>
                                  {variant === "selected"?"":
                                    <FormControl sx={{ borderBottom: 'none' ,textAlign:"end"}}>
                                        <NativeSelect
                                            defaultValue={30}
                                            sx={{padding:"0"}}
                                            input={<InputBase name="shift" id="uncontrolled-native"  />}
                                        >
                                            <option style={{ textAlign: 'end' }} value={"Day"}>Day Shift</option>
                                            <option style={{ textAlign: 'end' }} value={"Night"}>Night Shift</option>
                                            <option  style={{ textAlign: 'end' }} value={"Whole Day"}>Whole Day Shift</option>
                                        </NativeSelect>
                                    </FormControl>
                                  }
                                  {variant === "additional"?"": <>
                                      
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
                  <Typography variant="subtitle1" color="initial">Select your Inclusions</Typography>
                  <div>
                      <QuantitySelector name={"Towel"} value={towel} pricePerItem={100} setValue={setTowel}/>
                      <QuantitySelector name={"Slippers"} value={slippers} pricePerItem={150} setValue={setSlippers}/>
                      <QuantitySelector name={"Mattress"} value={mattress} pricePerItem={500} setValue={setMattress}/>
                  </div>
                  <hr style={{margin:"1em 0"}} />
                  <Typography variant="h5" fontWeight={600} color="primary">Entrance Fee</Typography>
                  <Typography variant="subtitle1" color="initial">Swimming Pool</Typography>
                  <div>
                      <QuantitySelector name={"Kids"} value={towel} pricePerItem={100} setValue={setTowel}/>
                      <QuantitySelector name={"Adult"} value={slippers} pricePerItem={150} setValue={setSlippers}/>
                      <QuantitySelector name={"Senior/PWD"} value={mattress} pricePerItem={500} setValue={setMattress}/>
                  </div>
              </div>
          </>:""}
      </div>
  </>
}

export default AccommodationCard