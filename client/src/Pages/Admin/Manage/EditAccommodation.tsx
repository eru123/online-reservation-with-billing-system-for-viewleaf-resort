import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {useParams, useNavigate} from 'react-router-dom'
import useAccommodation from '../../../Hooks/useAccommodation'
import useFirebase from '../../../Hooks/useFirebase'


function EditAccommodation() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { uploadFile, downloadURL } = useFirebase();
  const { updateAccommodation, updateInclusions, updateShift } = useAccommodation();
  const [inclusions, setInclusions] = useState<any>([]);
  const {data: accommodation, loading: accommodationLoading, error: accommodationError, getAccommodation} = useAccommodation();
  
  const [inclusionForm, setInclusionForm] = useState({
    name: '',
    price: 0
  })

  const [form, setForm] = useState({
    accommodationId: '',
    type: '',
    title: '',
    description: '',
    pax: '',
    image: '',
    fees: [{
      shift: 'day',
      rate: 0,
      adultFee: 0,
      kidsFee: 0
    },
    {
      shift: 'night',
      rate: 0,
      adultFee: 0,
      kidsFee: 0
    },
    {
      shift: 'whole day',
      rate: 0,
      adultFee: 0,
      kidsFee: 0
    }],
    availability: "available"
  })

  async function uploadImage(file: File) {
    const url = await uploadFile(file, 'orbs');
    setForm({
      ...form,
      image: String(url)
    })
    console.log( url)
  }

  function parseNumber(value:any) {
    const parsedValue = parseFloat(value);
  
    // Check if the parsed value is a number
    if (!isNaN(parsedValue)) {
      return parsedValue;
    } else {
      // If the value couldn't be parsed, return 0 or handle it as needed
      return 0;
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    updateAccommodation({...form, inclusions})
    updateInclusions({accommodationId: accommodation[0].accommodationId, inclusions})
    for (let i = 0; i < form.fees.length; i++) {
      updateShift({
        accommodationId: accommodation[0].accommodationId, 
        shift: form.fees[i].shift,
        rate: parseNumber(form.fees[i].rate),
        adultFee: parseNumber(form.fees[i].adultFee),
        kidsFee: parseNumber(form.fees[i].kidsFee),
      })
    }
    navigate('/admin/manage/accommodations')
  }

  const addInclusion = () => {
    if (inclusionForm.name === '' || inclusionForm.price === 0) {
      alert("Must fill in inclusion name and price")
    } 
    else{
      setInclusions([...inclusions, inclusionForm])
      setInclusionForm({
        name: '',
        price: 0
      })
    }
    console.log(inclusions)
    
  }

  const deleteInclusion = (index: number) => {
    setInclusions((prevInclusions: any) => {
      const newInclusions = [...prevInclusions];
      newInclusions.splice(index, 1);
      return newInclusions;
    });
    console.log(inclusions)
  };

  useEffect(() => {
    if (accommodation) {
      setForm({
        accommodationId: accommodation[0].accommodationId,
        type: accommodation[0].type,
        title: accommodation[0].title,
        description: accommodation[0].description,
        pax: accommodation[0].pax,
        image: accommodation[0].image,
        fees: [{
          shift: 'day',
          rate: accommodation[0].fees[0].rate,
          adultFee: accommodation[0].fees[0].guestFee.adult,
          kidsFee: accommodation[0].fees[0].guestFee.kids
        },
        {
          shift: 'night',
          rate: accommodation[0].fees[1].rate,
          adultFee: accommodation[0].fees[1].guestFee.adult,
          kidsFee: accommodation[0].fees[1].guestFee.kids
        },
        {
          shift: 'whole day',
          rate: accommodation[0].fees[2].rate,
          adultFee: accommodation[0].fees[2].guestFee.adult,
          kidsFee: accommodation[0].fees[2].guestFee.kids
        }],
        availability: accommodation[0].availability
      })
      setInclusions(accommodation[0].inclusions)
      console.log(form)
    }
    else{
      getAccommodation({
        accommodationId: id,
        all: true
      })
    }
  }, [accommodation])

  if (accommodationLoading) {
    return <div>Loading...</div>;
  }

  return <>
    <div>
      <form onSubmit={submit}>
      <Typography variant="h4" fontWeight={600} color="primary">Edit Accommodation</Typography>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={accommodation?.[0]?.type}
              label="Type"
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <MenuItem value={"room"}>Room</MenuItem>
              <MenuItem value={"cottage"}>Cottage</MenuItem>
              <MenuItem value={"resort"}>Resort</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="pax"
            label="Number of Pax"
            required
            fullWidth
            defaultValue={accommodation?.[0]?.pax}
            onChange={(e) => setForm({ ...form, pax: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            required
            fullWidth
            defaultValue={accommodation?.[0]?.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="type"
            label="Description"
            required
            fullWidth
            multiline
            maxRows={5}
            defaultValue={accommodation?.[0]?.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="image"
            // required
            fullWidth
            type='file'
            onChange={(e:any)=>{uploadImage(e.target.files[0])}}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="dayPrice"
            label="Day Shift Price"
            required
            fullWidth
            type='number'
            defaultValue={accommodation?.[0]?.fees?.[0]?.rate}
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                fees: [
                  {
                    ...prevForm.fees[0], // Copy the properties of the first element
                    rate: Number(e.target.value) // Update the rate property
                  },
                  ...prevForm.fees.slice(1) // Copy the rest of the elements
                ]
              }));
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="nightPrice"
            label="Night Shift Price"
            required
            fullWidth
            type='number'
            defaultValue={accommodation?.[0]?.fees?.[1]?.rate}
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                fees: [
                  ...prevForm.fees.slice(0, 1), // Copy the first element
                  {
                    ...prevForm.fees[1], // Copy the properties of the second element
                    rate: Number(e.target.value) // Update the rate property
                  },
                  ...prevForm.fees.slice(2) // Copy the rest of the elements
                ]
              }));
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="wholePrice"
            label="Whole Day Price"
            required
            fullWidth
            type='number'
            defaultValue={accommodation?.[0]?.fees?.[2]?.rate}
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                fees: [
                  ...prevForm.fees.slice(0, 2), // Copy the first and second elements
                  {
                    ...prevForm.fees[2], // Copy the properties of the third element
                    rate: Number(e.target.value) // Update the rate property
                  }
                ]
              }));
            }}
          />
        </Grid>
      </Grid>
      <Paper variant="elevation" elevation={1} sx={{padding:"1em",background:"#D9D9D9",margin:"2em 0"}} >
        <Typography variant="h6" color="primary" mb={".5em"}>Add Inclusions</Typography>
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
            <TextField
              id="nameInclusion"
              label="Name"
              fullWidth
              value={inclusionForm.name}
              onChange={(e) => setInclusionForm({ ...inclusionForm, name: e.target.value })}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <TextField
              id="nameInclusion"
              label="Price"
              fullWidth
              type='number'
              value={inclusionForm.price}
              onChange={(e) => setInclusionForm({ ...inclusionForm, price: Number(e.target.value) })}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <Button variant="contained" color="primary" fullWidth sx={{height:"100%"}} onClick={()=>addInclusion()}>
              ADD
            </Button>
          </Grid>
        </Grid>
        <Box display="flex" gap={".5em"} flexWrap={"wrap"} sx={{marginTop:"1em"}}>
          {inclusions.map((inclusion: { name: any; price: any }, index: number)=>{
            return(
              <Chip key={index} label={`${inclusion.name} (${inclusion.price})`} variant="outlined" onDelete={()=>deleteInclusion(index)}/>
            )
          })}
        </Box>
      </Paper>
      <Paper variant="elevation" elevation={1} sx={{padding:"1em",background:"#D9D9D9",margin:"2em 0"}} >
        <Typography variant="h6" color="primary" mb={".5em"}>Add Entrance Fees </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell >Day Shift Price</TableCell>
                <TableCell >Night Shift Price</TableCell>
                <TableCell >Whole Shift Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" color="initial">Kids</Typography>
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[0]?.guestFee?.kids}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          {
                            ...prevForm.fees[0], // Copy the properties of the first element
                            kidsFee: Number(e.target.value) // Update the rate property
                          },
                          ...prevForm.fees.slice(1) // Copy the rest of the elements
                        ]
                      }));
                    }}
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[1]?.guestFee?.kids}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          ...prevForm.fees.slice(0, 1), // Copy the first element
                          {
                            ...prevForm.fees[1], // Copy the properties of the second element
                            kidsFee: Number(e.target.value) // Update the rate property
                          },
                          ...prevForm.fees.slice(2) // Copy the rest of the elements
                        ]
                      }));
                    }}
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[2]?.guestFee?.kids}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          ...prevForm.fees.slice(0, 2), // Copy the first and second elements
                          {
                            ...prevForm.fees[2], // Copy the properties of the third element
                            kidsFee: Number(e.target.value) // Update the rate property
                          }
                        ]
                      }));
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" color="initial">Adults</Typography>
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[0]?.guestFee?.adult}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          {
                            ...prevForm.fees[0], // Copy the properties of the first element
                            adultFee: Number(e.target.value) // Update the rate property
                          },
                          ...prevForm.fees.slice(1) // Copy the rest of the elements
                        ]
                      }));
                    }}
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[1]?.guestFee?.adult}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          ...prevForm.fees.slice(0, 1), // Copy the first element
                          {
                            ...prevForm.fees[1], // Copy the properties of the second element
                            adultFee: Number(e.target.value) // Update the rate property
                          },
                          ...prevForm.fees.slice(2) // Copy the rest of the elements
                        ]
                      }));
                    }}
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                    defaultValue={accommodation?.[0]?.fees?.[2]?.guestFee?.adult}
                    onChange={(e) => {
                      setForm((prevForm) => ({
                        ...prevForm,
                        fees: [
                          ...prevForm.fees.slice(0, 2), // Copy the first and second elements
                          {
                            ...prevForm.fees[2], // Copy the properties of the third element
                            adultFee: Number(e.target.value) // Update the rate property
                          }
                        ]
                      }));
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" color="initial">Senior / PWD</Typography>
                  <Typography variant="subtitle2" fontSize={"10px"} color="initial">20% Off</Typography>
                </TableCell>
                <TableCell align='center'>
                  {form.fees[0].adultFee !== 0 ? form.fees[0].adultFee * 0.8 : (accommodation?.[0]?.fees?.[0]?.guestFee?.adult * 0.8)}
                </TableCell>
                <TableCell align='center'>
                  {form.fees[1].adultFee !== 0 ? form.fees[1].adultFee * 0.8 : (accommodation?.[0]?.fees?.[1]?.guestFee?.adult * 0.8)}
                </TableCell>
                <TableCell align='center'>
                  {form.fees[2].adultFee !== 0 ? form.fees[2].adultFee * 0.8 : (accommodation?.[0]?.fees?.[2]?.guestFee?.adult * 0.8)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box display="flex">
        <FormControlLabel 
          sx={{flexGrow:"1"}} 
          control={
          <Checkbox 
            defaultChecked = {form?.availability === "available"}
            onChange={(e) => setForm({...form, availability: e.target.checked ? "available" : "unavailable"})}/>} 
            label="Set as available" 
          />
        <Button variant="contained" color="primary" type='submit'>
          Create
        </Button>
      </Box>
      </form>
    </div>
  </>
}

export default EditAccommodation