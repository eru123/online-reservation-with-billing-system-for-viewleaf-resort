import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'

function Notifications() {
    return<>
        <Typography variant="h4" fontWeight=  {600} color="primary">Notifications</Typography>
        <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of all notifications </Typography>


        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Paper elevation={2} sx={{width:"100%" ,padding:"1em"}} component={Link} to={'/admin/reservation/view'}>
                <Typography variant="subtitle2" color="initial">#231321</Typography>
                <Typography variant="h6" color="initial">Rony Ronzy</Typography>
                <Typography variant="body1" color="initial">You accept the reservation</Typography>
            </Paper>
            <Paper elevation={2} sx={{width:"100%" ,padding:"1em"}} component={Link} to={'/admin/reservation/view'}>
                <Typography variant="subtitle2" color="initial">#231321</Typography>
                <Typography variant="h6" color="initial">Rony Ronzy</Typography>
                <Typography variant="body1" color="initial">You accept the reservation</Typography>
            </Paper>
            <Paper elevation={2} sx={{width:"100%" ,padding:"1em"}} component={Link} to={'/admin/reservation/view'}>
                <Typography variant="subtitle2" color="initial">#231321</Typography>
                <Typography variant="h6" color="initial">Rony Ronzy</Typography>
                <Typography variant="body1" color="initial">You accept the reservation</Typography>
            </Paper>
        </Box>
    </>
}

export default Notifications