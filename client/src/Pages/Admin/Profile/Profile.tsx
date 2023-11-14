import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

function Profile() {
    return <>
        <Box display={"flex"}>
            <Box width={"300px"} >
                <Box position={"sticky"} sx={{display:"flex",flexDirection:"column",gap:"2em", alignItems:"center"}} top={"10px"} >
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150}}
                    />
                    <Chip label="Change Photo" variant="outlined" onClick={()=>{}} />
                </Box>
            </Box>
            <Box flexGrow={"1"} minHeight={"100vh"} paddingTop={"20px"}>
                <Typography variant="h4" fontWeight={600} color="primary" >My Profile</Typography>
                <Box display={"flex"}>
                    <Typography variant="h6" color="initial" sx={{flexGrow:"1"}}>Details</Typography>
                    <Chip label="Edit details" variant="outlined" onClick={()=>{}} />
                </Box>
            </Box>
        </Box>
    </>
}

export default Profile