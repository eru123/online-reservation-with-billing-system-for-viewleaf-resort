import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px"
};
function GuestDetails() {
    const [open, setOpen] = React.useState("");
    return <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="name"
                    label="Name"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item md={5} xs={8}>
                <TextField
                    id="email"
                    label="Email"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item md={2} xs={4}>
                <Button variant="contained" color="primary" fullWidth sx={{height:"100%",background:"#414141"}} onClick={()=>setOpen("verify")}>
                    Verify
                </Button>
            </Grid>
            <Grid item md={5} xs={12}>
                <TextField
                    id="contactNo"
                    label="Contact Number"
                    required
                    fullWidth
                />
            </Grid>
        </Grid>
        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                {open === "verify"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Email verification
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        We already email you a 6 digit code, Please check your email and enter the code to complete the verification
                    </Typography>
                    <Grid container spacing={2} sx={{marginTop:"35px"}}>
                        <Grid item  xs={8}>
                            <TextField
                                id="OTP"
                                label="OTP"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" fullWidth sx={{height:"100%",background:"#414141"}} onClick={()=>setOpen("verify")}>
                                Verify
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="text" color="primary" fullWidth sx={{marginTop:"25px"}} onClick={()=>setOpen("")}>
                                cancel
                            </Button>
                        </Grid>
                    </Grid>
                </>:""}
            </Box>
        </Modal>
    </>
}

export default GuestDetails