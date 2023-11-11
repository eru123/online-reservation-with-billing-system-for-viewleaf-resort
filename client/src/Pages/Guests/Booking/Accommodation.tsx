import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AccommodationCard from '../../../Components/AccommodationCard'
function Accommodation() {
    return <>
        <Box display="flex" flexDirection={"column"} gap={"25px"} >
            <AccommodationCard variant="selected"/>
        </Box>
        <Typography variant="h4" color="primary" mt={"3em"} fontWeight={600}>Suggested Accommodation</Typography>
        <Typography variant="body1" color="initial" fontWeight={400} mb={"20px"}>List of all available accommodation</Typography>
        <Box display="flex" flexDirection={"column"} gap={"25px"} >
            <AccommodationCard variant="view"/>
        </Box>
    </>
}

export default Accommodation