import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  type:"title"| "subTitle"
  icon:any
  title:string
  link:string
}


const Style = { 
  padding:".5em 1em",
  color:"#5C5C5C",
  background:"white",
  '&:hover': {
    background: '#D9D9D9',
    opacity:"1",
    color:"#5C5C5C"
  },
  transition:"background .3s ease-in-out"
}
const ActiveStyle = { 
  color:"#ffffff",
  background:"#70AE45",
  '&:hover': {
    background: '#70AE45',
  },
}
function NavItem({type,icon,title,link}:Props) {
  return (
    <Typography variant={type=="title"?"h6":"subtitle1"}component={"a"} href={link} color="initial" sx={window.location.pathname === link?{...Style,...ActiveStyle}:{...Style}}> 
      <Box display="flex" gap={"10px"} alignItems={"center"} > {icon} {title}</Box>
    </Typography>
  )
}

export default NavItem