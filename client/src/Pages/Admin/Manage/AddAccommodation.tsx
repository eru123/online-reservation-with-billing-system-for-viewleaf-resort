import React from 'react'
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






function AddAccommodation() {
  return <>
    <div>
      <Typography variant="h4" fontWeight={600} color="primary">Add Accommodation</Typography>
      <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Fill up information to add accommodation</Typography>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <TextField
            id="type"
            label="Type"
            required
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="pax"
            label="Number of Pax"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            required
            fullWidth
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
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="image"
            required
            fullWidth
            type='file'
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="dayPrice"
            label="Day Shift Price"
            required
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="nightPrice"
            label="Night Shift Price"
            required
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            id="wholePrice"
            label="Whole Day Price"
            required
            fullWidth
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
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <TextField
              id="nameInclusion"
              label="Price"
              fullWidth
              type='number'
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <Button variant="contained" color="primary" fullWidth sx={{height:"100%"}}>
              ADD
            </Button>
          </Grid>
        </Grid>
        <Box display="flex" gap={".5em"} flexWrap={"wrap"} sx={{marginTop:"1em"}}>
          <Chip label="Slippers (100)" variant="outlined" onDelete={()=>{alert("deleted")}} />
          <Chip label="Mattress (200)" variant="outlined" onDelete={()=>{alert("deleted")}} />
          <Chip label="Towel (300)" variant="outlined" onDelete={()=>{alert("deleted")}} />
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
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
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
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    id=""
                    label=""
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" color="initial">Senior / PWD</Typography>
                  <Typography variant="subtitle2" fontSize={"10px"} color="initial">20% Off</Typography>
                </TableCell>
                <TableCell align='center'>
                  0
                </TableCell>
                <TableCell align='center'>
                  0
                </TableCell>
                <TableCell align='center'>
                  0
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box display="flex">
        <FormControlLabel sx={{flexGrow:"1"}} control={<Checkbox defaultChecked />} label="Make it this active?" />
        <Button variant="contained" color="primary" href={"/admin/manage/accommodations"}>
          Create
        </Button>
      </Box>
    </div>
  </>
}

export default AddAccommodation