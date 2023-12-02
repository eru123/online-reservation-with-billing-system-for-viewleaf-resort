import React from 'react'
import Typography from '@mui/material/Typography'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'


function Payment() {
    return <>
      <Container maxWidth="lg" sx={{padding:"6em 0 7em"}}>
        <Typography variant="h4" color="primary" fontWeight={600}>Payment</Typography>
        <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>You can follow the instruction Below</Typography>
        <Box display="flex" gap={4}>
          <Box >
            <Typography variant="subtitle2" color="initial" sx={{opacity:'.6'}}>Total</Typography>
            <Typography variant="h6" color="initial" fontWeight={600}>₱1,150</Typography>
          </Box>
          <Box >
            <Typography variant="subtitle2" color="initial" sx={{opacity:'.6'}}>Min. Payment</Typography>
            <Typography variant="h6" color="initial" fontWeight={600}>₱400</Typography>
          </Box>
        </Box>
        <div style={{marginTop:"25px",marginBottom:"25px"}}>
            {/* Replace this div if will put the PDF viewer */}
          <div style={{background:"#D9D9D9",height:"100vh",borderRadius:"8px",display:"flex",justifyContent:"center",alignItems:"center",maxHeight:"1100px"}}>
            <PictureAsPdfIcon sx={{fontSize:"90px",opacity:".5",}}/>
          </div>
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="I agree with ViewLeaf's" />
              <Typography variant="body1" component={"a"} href='/policy' fontWeight={500} color="initial" marginLeft={"-12px"}>Policies</Typography>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"2em 0"}}>
            <img width={"50%"} src="https://i0.wp.com/gabotaf.com/wp-content/uploads/2020/09/Is-GCash-allowed-as-mode-payment-for-government-transactions.jpg?fit=1054%2C1286&ssl=1" alt="" />
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"2em 0",gap:'15px'}}>
              <input type="file" name="upload" id="upload" style={{display:"none"}}/>
              <label htmlFor="upload">
                <Chip label="Upload Payment Receipt " variant="outlined" onClick={()=>{}}/>
              </label>
              <Chip label="Send" variant="filled" color='primary' sx={{color:"white"}} onClick={()=>{}}/>
          </div>
      </Container>
    </>
}

export default Payment