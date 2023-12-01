import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'



type Props = {
  updateCustomer: any;
  form: any;
}

function GuestDetails({updateCustomer, form}:Props) {
    return <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="name"
                    label="Name"
                    required
                    fullWidth
                    onChange={(e)=>{
                      updateCustomer({
                        name: e.target.value
                      });
                      console.log(e.target.value)
                    }}  
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    id="email"
                    label="Email"
                    required
                    fullWidth
                    onChange={(e)=>{
                      updateCustomer({
                        email: e.target.value
                      })  
                    }}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    id="contactNo"
                    label="Contact Number"
                    required
                    fullWidth
                    onChange={(e)=>{
                      updateCustomer({
                        phone: e.target.value
                      })
                    }}
                />
            </Grid>
        </Grid>
        
    </>
}

export default GuestDetails