import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import ModeEditIcon from '@mui/icons-material/ModeEdit';

function PaymentInstruction() {
    return <>
        <div>
            <Typography variant="h4" fontWeight={600} color="primary">Manage Payment Instruction</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Update the instruction for the payment</Typography>
            <Box display="flex" sx={{margin:"2em 0"}}>
                <Box sx={{flexGrow:"1",display:"flex"}}>
                    <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".5em 1em",borderRadius:"1000px"}}>
                        <Box display={"flex"} gap={"8px"}>
                            <Typography variant="subtitle1" fontWeight={600} color="initial">Promo:</Typography>
                            <Typography variant="subtitle1" color="initial">80%</Typography>
                        </Box>
                        <IconButton aria-label="edit" onClick={()=>{}}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Box>
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
        </div>
    
    </>
}

export default PaymentInstruction