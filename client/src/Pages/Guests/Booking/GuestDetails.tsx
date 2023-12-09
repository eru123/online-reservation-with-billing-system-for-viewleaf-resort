import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'



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
              onChange={(e) => {
                const inputValue = e.target.value;

                // Remove non-numeric characters
                const numericValue = inputValue.replace(/[^0-9]/g, '');

                // Ensure the length is no more than 11 characters
                const truncatedValue = numericValue.slice(0, 11);

                // Update the state or perform other actions with the cleaned value
                updateCustomer({
                  phone: truncatedValue
                });
              }}
              type="tel"
              inputProps={{
                pattern: '^[0-9]{0,11}$',  // Allow up to 11 numeric characters
                maxLength: 11  // Maximum length set to 11 to prevent more than 11 characters
              }}
            />
          </Grid>
      </Grid>
      
  </>
}

export default GuestDetails