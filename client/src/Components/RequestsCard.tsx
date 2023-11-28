import React from 'react'
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom';




type Props = {
    status: "rescheduling" | "pending" | "canceling" | "refunding"
}
function RequestsCard({status}:Props) {
    return <>
        <Paper variant="elevation" component={Link} to="/admin/reservation/view" elevation={3} sx={{padding:"1em",borderRadius:"8px",maxWidth:"1200px"}}>
            <Box display="flex">
                <Box flexGrow={"1"}>
                    <Typography variant="h5" color="initial">#123A23123</Typography>
                    <Typography variant="subtitle1" color="#535353" >Reference Number</Typography>
                </Box>
                <Chip label={status.toUpperCase()} color='warning' />
            </Box>
            <Paper variant="elevation" elevation={0} sx={{borderRadius:"8px",background:"#D9D9D9",padding:"1em",margin:"1em 0" ,display:"flex",alignItems:"center"}}>
                <Box sx={{flexGrow:"1"}}>
                    <Typography variant="h5" color="initial" fontWeight={500}>Jon Doe</Typography>
                    <Box display="flex" gap={"15px"} mt={1}>
                        <Box display="flex" gap="5px">
                            <CallIcon/>
                            <Typography variant="body1" color="initial">0915-232-1231</Typography>
                        </Box>
                        <Box display="flex" gap="5px">
                            <EmailIcon/>
                            <Typography variant="body1" color="initial">jondoe@gmail.com</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            {status === "rescheduling"?<>
                <Typography variant="subtitle1" fontWeight={500}>Requested Date</Typography>
                <Typography variant="body2">Oct 25, 2023</Typography>
            </>:""}
            <Typography variant="subtitle1" fontWeight={500} mt={".2em"}>Note</Typography>
            <Typography variant="body2" textAlign={"justify"}>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..</Typography>
        </Paper>  
    </>
}

export default RequestsCard