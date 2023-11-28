import React,{useState} from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// Tabs
import Accommodation from './Accommodation'
import GuestDetails from './GuestDetails'
import BookingStatement from './BookingStatement'
import Payment from './Payment'

function Booking() {
  const [active,setActive] =  useState(1);
  return (
    <Container maxWidth="lg" sx={{padding:"6em 0 7em"}}>
      {active === 1?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Selected Accommodation</Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Select you want to rent</Typography>
          <Accommodation/>
      </>:""}
      {active === 2?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Booking Statements</Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Here you will see all breakdown to your reservation</Typography>   
          <BookingStatement additional={false}/>
      </>:""}
      {active === 3?<>
          <Typography variant="h4" color="primary" fontWeight={600}>Guest Details </Typography>
          <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>Please provide your information to so we can send update to you</Typography>
          <GuestDetails/>
      </>:""}
      

      <Paper variant="elevation" elevation={3} sx={{position:"fixed",bottom:"0",left:"0",right:"0",padding:" 0 0 1em ",alignItems:"center"}}>
          {active === 5?"":<Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={active===1?33:0 || active===2?75:0 ||active===3?100:0}/>
          </Box>}

          <Container maxWidth="lg"sx={{display:"flex",alignItems:"center",marginTop:"1em"}}>
              <div style={{flexGrow:"1"}}>
                  <Typography variant="h6" color="initial">TOTAL : ₱1,150</Typography>
                  <Typography variant="subtitle2" color="initial" fontWeight={600}>Min. Payment of ₱400  </Typography>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                  <Button variant="text" onClick={()=> {if(active>1){setActive(active-1)}}}>
                      back
                  </Button>
                  {active===3?
                    <Button variant="contained" color="primary" href='Invoice'>
                        Finish
                    </Button>
                  :
                    <Button variant="contained" color="primary" onClick={()=> {if(active<4){setActive(active+1)}}}>
                        Next
                    </Button>
                  }
              </div>
          </Container> 
      </Paper>
    </Container>
  )
}

export default Booking