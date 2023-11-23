import React from 'react'
import Typography from '@mui/material/Typography'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
function Payment() {
    return <>
        
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
            <input type="file" name="upload" id="upload" style={{display:"none"}}/>
            <label htmlFor="upload">
                <Chip label="Upload Payment Receipt " variant="outlined" onClick={()=>{}}/>
            </label>
        </div>
    </>
}

export default Payment