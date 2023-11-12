import React from 'react'
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box'
import { AppBar, Typography, Container } from '@mui/material';
import logoDrop from '../../Images/LogoDrop.png'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ModeIcon from '@mui/icons-material/Mode';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

type Props = {
}
function App({}:Props) {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    return <>
      <Box display="flex" gap={"25px"} sx={{height:"100%",minHeight:"100vh"}}>
        <AppBar position="relative" sx={{background:"white",maxWidth:"250px" , minHeight:"100%"}}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <a href="/admin" style={{margin:"40px auto",width:"60%"}}>
              <img width={"100%"} src={logoDrop} alt="" />
            </a>
              
            <Typography variant="h6" component={"a"} href='/admin' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><SpaceDashboardIcon/> Dashboard</Box>
            </Typography>



            <Typography variant="h6"  color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><EventAvailableIcon/> Reservation</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/reservation/list' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>List of Reservation</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/reservation/requests' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>Requests</Box>
            </Typography>

            <Typography variant="h6"  color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><ModeIcon/> Manage</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/manage/accommodations' color="initial" fontWeight={400} sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"}  ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>Accommodation</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/manage/content' color="initial" fontWeight={400} sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"}  ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>Content</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/manage/paymentInstruction' color="initial" fontWeight={400} sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"}  ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>Payment Instruction</Box>
            </Typography>
            <Typography variant="subtitle1" component={"a"} href='/admin/manage/policy' color="initial" fontWeight={400} sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"}  ><FiberManualRecordIcon sx={{transform:"scale(.6)"}}/>Policy</Box>
            </Typography>

            <Typography variant="h6" component={"a"} href='/admin/report' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><AssessmentIcon/> Reports</Box>
            </Typography>

            <Typography variant="h6" component={"a"} href='/admin' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><PersonIcon/> Staff </Box>
            </Typography>

            <Typography variant="h6" component={"a"} href='/admin' color="initial" sx={{
              padding:".5em 1em",
              color:"#5C5C5C",
              '&:hover': {
                background: '#D9D9D9',
                opacity:"1"
              },
            }}> 
              <Box display="flex" gap={"10px"} alignItems={"center"} ><NotificationsIcon/> Notification </Box>
            </Typography>
          </div>
        </AppBar>
        <div style={{flexGrow:"1",padding:"1em 1em 4em"}}>
          <Box display="flex" sx={{padding:"1em"}} >
            <Box sx={{flexGrow:"1"}}></Box>
            <Box display="flex" alignItems={"center"} gap={"5px"} sx={{cursor:"pointer"}} onClick={handleClick}>
              <Typography variant="subtitle1" color="initial">Remy Sharp</Typography>
              <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
            </Box>
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <div style={{padding:"4em 1em 1em 0"}}>
            <Container maxWidth="lg">
              <Outlet/>
            </Container>
          </div>
        </div>
      </Box>
    </>
}

export default App