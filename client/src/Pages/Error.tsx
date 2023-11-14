import React from 'react'
import Box from '@mui/material/Box'
import Image from '../Images/lostPage.png'
import Typography from '@mui/material/Typography'
function Error() {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <img src={Image}  width={"30%"} alt="" />
        <Typography variant="h4" color="primary" fontWeight={500} mt={"25px"}>404 Error</Typography>
        <Typography variant="h6" color="primary">Sorry, Page Not Found</Typography>
    </div>
  )
}

export default Error