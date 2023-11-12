import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Policy() {
    return <>
        <Typography variant="h4" fontWeight={600} color="primary">Manage Policy </Typography>
        <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Update your policy</Typography>
        <Box display="flex" sx={{margin:"2em 0"}}>
                <Box sx={{flexGrow:"1",display:"flex"}}>
                    
                </Box>
                <Button variant="contained" color="primary" onClick={()=>{}}>
                    Upload PDF
                </Button>
            </Box>
        <Box>
            <Box display="flex" justifyContent={"center"} alignItems={"center"}  minHeight={"800px"} sx={{background:"#B8B8B8",borderRadius:"12px"}}>   
                <PictureAsPdfIcon sx={{fill:"#626262",fontSize:"100px"}}/>
            </Box>
        </Box>
    </>
}

export default Policy