import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import RequestsCard from '../../../Components/RequestsCard';


function Requests() {
    const [anchorElMoreMenu, setAnchorElMoreMenu] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorElMoreMenu);
    return <>
        <div>
            <Typography variant="h4" fontWeight={600} color="primary">Reservation Requests</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Here are all the list of reservation</Typography>
            <Grid container spacing={2}>
                <Grid item  xs={12}>
                    <Box display="flex" flexDirection={"column"} gap={"15px"} >
                      <RequestsCard status='paid'/>
                      <RequestsCard status='rescheduling'/>
                      <RequestsCard status='cancelling'/>
                      <RequestsCard status='refunding'/>
                    </Box>
                </Grid>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorElMoreMenu}
                open={openMenu}
                onClose={()=>setAnchorElMoreMenu(null)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>View Invoice</MenuItem>
                <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Additional</MenuItem>
                <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Reschedule</MenuItem>
                <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Cancel</MenuItem>
            </Menu>
        </div>
    </>
}

export default Requests