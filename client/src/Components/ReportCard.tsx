import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KingBedIcon from '@mui/icons-material/KingBed';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
type Props = {
    variant: "reservation" | "accommodation" |"revenue"
    title: string
    value: number
    
}
function ReportCard({variant,title,value}:Props) {
    return (
        <Paper variant="elevation" elevation={3} sx={{minWidth:"300px",padding:"1em",background:"#D9D9D9"}}>
            <Box display="flex" alignItems={"center"}  gap={"10px"}>
                <Box display="flex" sx={{background:"white", height:"70px",width:"70px",borderRadius:"12px",justifyContent:"center", alignItems:"center"}}>

                    {variant==="reservation"?<PeopleAltIcon sx={{fontSize:"40px"}} color='primary'/>:""}
                    {variant==="accommodation"?<KingBedIcon sx={{fontSize:"40px"}} color='primary'/>:""}
                    {variant==="revenue"?<PaymentsIcon sx={{fontSize:"40px"}} color='primary'/>:""}
                </Box>
                <Box>
                    <Typography variant="subtitle1" color="#5A5A5A" fontWeight={500}>{title}</Typography>
                    <Typography variant="h4" color="primary" marginTop={"-8px"} fontWeight={600}>
                      {variant ==="revenue"?
                      "₱":""}
                      {value?.toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default ReportCard