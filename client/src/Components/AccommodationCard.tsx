import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import QuantitySelector from './QuantitySelector';

import { useParams, useNavigate } from 'react-router-dom';

type Props={
  variant: "selected"|"view"|"manage"|"additional" | "display"
  openModal : React.Dispatch<React.SetStateAction<string>>
  accommodation?: any;
  selectAccommodation?: any;
  addInclusion?: any;
  editGuests?: any;
}

function AccommodationCard({
  variant,
  openModal, 
  accommodation, 
  selectAccommodation,
  addInclusion,
  editGuests
}:Props) {

  const {date, shift} = useParams();
  const [selectedShift,setSelectedShift] = useState("Day Shift");
  const navigate = useNavigate();

  return <>
      <div>
          <div style={{paddingBottom:"10px",backgroundColor:"#DADADA", borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>
              <Paper variant="elevation" elevation={3} sx={{borderRadius:"10px",overflow:"hidden"}}>
                  <Grid container spacing={0}>
                      <Grid item md={3} xs={12}>
                        <img width={"100%"} height={"100%"} src={accommodation?.image} alt="" />
                      </Grid>
                      <Grid item md={6} xs={9} sx={{padding:"1em"}}>
                          <Box >
                              <Typography variant="subtitle2" color="initial" fontWeight={500} textTransform={"uppercase"}>{accommodation?.type}</Typography>
                              <Typography variant="h5" color="Primary" fontWeight={600} >{accommodation?.title}</Typography>
                              <Typography sx={{minHeight:"100px"}} variant="body2" color="initial"  textAlign={"justify"}>{accommodation?.description}</Typography>
                              <Typography variant="subtitle2" color="initial" fontWeight={500} sx={{marginTop:"10px",opacity:'.6',marginBottom:"5px"}}>Inclusion</Typography>
                              <Box display="flex" sx={{flexWrap:"wrap",gap:"10px"}}>
                                {accommodation?.inclusions?.map((inclusion:any)=>{
                                    return <Chip label={inclusion.name + " (₱" + inclusion.price + ")"} variant="outlined" />
                                })}
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
                                            value={selectedShift}
                                            onChange={(e)=>{
                                              setSelectedShift(e.target.value)
                                            }}
                                        >
                                            <option style={{ textAlign: 'end' }} value={"Day Shift"}>Day Shift</option>
                                            <option style={{ textAlign: 'end' }} value={"Night Shift"}>Night Shift</option>
                                            <option  style={{ textAlign: 'end' }} value={"Whole Day"}>Whole Day</option>
                                        </NativeSelect>
                                    </FormControl>
                                  }
                                  {variant === "additional"?"": <>
                                    <Typography variant="h4" color="Primary" fontWeight={700} >₱
                                      {selectedShift ==="Day Shift"?<>
                                        {accommodation?.fees?.[0]?.rate}
                                      </>:""}
                                      {selectedShift ==="Night Shift"?<>
                                        {accommodation?.fees?.[1]?.rate}
                                      </>:""}
                                      {selectedShift ==="Whole Day"?<>
                                        {accommodation?.fees?.[2]?.rate}
                                      </>:""}
                                    </Typography>
                                    <Typography variant="subtitle2" color="inital" >for {accommodation?.pax} pax</Typography>
                                    
                                  </>}
                              </div>
                              <div style={{display:"flex",justifyContent:"end"}}>
                                  {(variant==="selected")?
                                      <Button variant="contained" color="primary" onClick={()=>{selectAccommodation(accommodation)}}>    
                                          Unbook
                                      </Button>
                                      :""
                                  }
                                  {(variant==="view")?
                                      <Button variant="contained" color="primary" onClick={()=>{selectAccommodation(accommodation)}}>    
                                          Book
                                      </Button>
                                  :""}
                                  {(variant==="manage")?
                                      <Button variant="contained" color="primary" onClick={()=>{navigate(`/admin/manage/accommodation/edit/${accommodation.accommodationId}`)}}>    
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
                  {accommodation?.inclusions?.map((inclusion: any) => (
                    <QuantitySelector
                      key={inclusion.inclusionId}
                      name={inclusion.name}
                      value={inclusion.quantity ? inclusion.quantity : 0}
                      pricePerItem={inclusion.price}
                      inclusion={inclusion}
                      type="inclusion"
                      setValue={(newValue) => addInclusion(accommodation?.accommodationId, { ...inclusion, quantity: newValue })}
                    />
                  ))}
                  </div>
                  <hr style={{margin:"1em 0"}} />
                  <Typography variant="h5" fontWeight={600} color="primary">Entrance Fee</Typography>
                  <Typography variant="subtitle1" color="initial">Swimming Pool</Typography>
                  <div>
                      <QuantitySelector 
                        name={"Kids"} 
                        value={accommodation?.guests?.children ? accommodation?.guests?.children : 0} 
                        pricePerItem={accommodation?.fees?.[parseInt(shift||"0")]?.guestFee?.kids} 
                        setValue={(value) => editGuests(accommodation?.accommodationId, { children: value })}
                        type="guest"
                      />
                      <QuantitySelector 
                        name={"Adult"} 
                        value={ accommodation?.guests?.adult ? accommodation?.guests?.adult : 0} 
                        pricePerItem={accommodation?.fees?.[parseInt(shift||"0")]?.guestFee?.adult} 
                        setValue={(value) => editGuests(accommodation?.accommodationId, { adult: value })}
                        type="guest"
                      />
                      <QuantitySelector 
                        name={"Senior"} 
                        value={ accommodation?.guests?.senior ? accommodation?.guests?.senior : 0} 
                        pricePerItem={accommodation?.fees?.[parseInt(shift||"0")]?.guestFee?.adult * 0.8} 
                        setValue={(value) => editGuests(accommodation?.accommodationId, { senior: value })}
                        type="guest"
                      />
                      <QuantitySelector 
                        name={"PWD"} 
                        value={ accommodation?.guests?.pwd ? accommodation?.guests?.pwd : 0} 
                        pricePerItem={accommodation?.fees?.[parseInt(shift||"0")]?.guestFee?.adult * 0.8} 
                        setValue={(value) => editGuests(accommodation?.accommodationId, { pwd: value })}
                        type="guest"
                      />
                  </div>
              </div>
          </>:""}
      </div>
  </>
}

export default AccommodationCard