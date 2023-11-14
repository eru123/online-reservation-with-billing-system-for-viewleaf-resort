import React,{useState} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Modal,Grid,TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px",
    maxHeight:"90vh",
    overflowY:"scroll"
};

function PaymentInstruction() {
    const [open, setOpen] = useState("");
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
                        <IconButton aria-label="edit" onClick={()=>{setOpen("editPromo")}}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Button variant="contained" color="primary" onClick={()=>{setOpen("editPDF")}}>
                    Upload PDF
                </Button>
            </Box>
            <Box>
                <Box display="flex" justifyContent={"center"} alignItems={"center"}  minHeight={"800px"} sx={{background:"#B8B8B8",borderRadius:"12px"}}>   
                    <PictureAsPdfIcon sx={{fill:"#626262",fontSize:"100px"}}/>
                </Box>
            </Box>
        </div>
        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                
                {open === "editPromo"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Edit Promo
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                type='number'
                                id="promo"
                                label="Promo"
                                fullWidth
                                inputProps={{
                                    min: 0, 
                                    max: 100, 
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} padding={"1em 0"}>
                            
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                back
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                
                </>:""}
                {open === "editPDF"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Upload PDF
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Set payment instruction for the guests
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                type='file'
                                id="promo"
                                fullWidth
                            />
                        </Grid>
                        
                        <Grid item xs={12} padding={"1em 0"}>
                            
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                back
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                
                </>:""}

            </Box>
        </Modal>
    </>
}

export default PaymentInstruction