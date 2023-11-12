import React from 'react'
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button'

type Props = {
    variant: "reschedule" | "pending"
}
function RequestsCard({variant}:Props) {
    return <>
        {variant === "reschedule"? <>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",borderRadius:"8px",maxWidth:"1200px"}}>
                <Box display="flex" >
                    <Box sx={{flexGrow:"1"}}>
                        <Chip label="Reschedule" color="warning" size="small" />
                        <Typography variant="h5" color="initial" fontWeight={600} sx={{marginTop:"8px"}}>Jon Doe</Typography>
                    </Box>
                    <Tooltip title="View Receipt">
                        <IconButton aria-label=""  size="large" >
                            <ReceiptLongIcon  fontSize="inherit"/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box display="flex" gap={"15px"}>
                    <Box display="flex" gap="5px">
                        <CallIcon/>
                        <Typography variant="body2" color="initial">0915-232-1231</Typography>
                    </Box>
                    <Box display="flex" gap="5px">
                        <EmailIcon/>
                        <Typography variant="body2" color="initial">jondoe@gmail.com</Typography>
                    </Box>
                </Box>
                <Box display="flex" gap={"25px"} marginTop={"25px"}>
                    <Box>
                        <Typography variant="subtitle2" color="initial">Reserved Date </Typography>
                        <Typography variant="body1" color="initial">Oct 25, 2023 Day Shift</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="initial">Request Date </Typography>
                        <Typography variant="body1" color="initial">Oct 25, 2023 Day Shift</Typography>
                    </Box>
                </Box>
                <Typography variant="subtitle2" color="initial" mt={"1em"}>Note</Typography>
                <Typography variant="body1" color="initial">I want to reschedule my reservation because something happened on our end, I hope you accept our request</Typography>

                <Box display={"flex"} gap={"25px"} justifyContent={"end"} mt={"2em"}>
                    <Button variant="text" color="primary">
                        Decline
                    </Button>
                    <Button variant="contained" color="primary">
                        Accept
                    </Button>
                </Box>
            </Paper>  
        </>:""} 
        {variant === "pending"? <>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",borderRadius:"8px",maxWidth:"1200px"}}>
                <Box display="flex" >
                    <Box sx={{flexGrow:"1"}}>
                        <Chip label="Pending" color="info" size="small" />
                        <Typography variant="h5" color="initial" fontWeight={600} sx={{marginTop:"8px"}}>Jon Doe</Typography>
                    </Box>
                    <Tooltip title="View Receipt">
                        <IconButton aria-label=""  size="large" >
                            <ReceiptLongIcon  fontSize="inherit"/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box display="flex" gap={"15px"}>
                    <Box display="flex" gap="5px">
                        <CallIcon/>
                        <Typography variant="body2" color="initial">0915-232-1231</Typography>
                    </Box>
                    <Box display="flex" gap="5px">
                        <EmailIcon/>
                        <Typography variant="body2" color="initial">jondoe@gmail.com</Typography>
                    </Box>
                </Box>
                <Box display="flex" gap={"25px"} marginTop={"25px"}>
                    <Box>
                        <Typography variant="subtitle2" color="initial">Reserved Date </Typography>
                        <Typography variant="body1" color="initial">Oct 25, 2023 Day Shift</Typography>
                    </Box>
                </Box>
                <Typography variant="subtitle2" color="initial" mt={"1em"}>Note</Typography>
                <Typography variant="body1" color="initial">I want to reschedule my reservation because something happened on our end, I hope you accept our request</Typography>

                <Box display={"flex"} gap={"25px"} justifyContent={"end"} mt={"2em"}>
                    <Button variant="text" color="primary">
                        Decline
                    </Button>
                    <Button variant="contained" color="primary">
                        Accept
                    </Button>
                </Box>
            </Paper>  
        </>:""} 
    </>
}

export default RequestsCard