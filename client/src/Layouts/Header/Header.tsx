import React,{useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LogoImg from '../../Images/LogoDrop.png'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link } from 'react-router-dom';

type Anchor = 'top' | 'right' | 'bottom' | 'right';

export default function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <AppBar position="static" sx={{background:"white",height:"80px",zIndex:"1000",position:"fixed",top:"0"}}>
      <Container maxWidth="xl" sx={{position:"relative"}}>
        <Box display="flex"  sx={{gap:"40px",justifyContent:"center",alignItems:"center"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#about"
            sx={{
              fontWeight:"500",
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: '#2B2B2B',
              textDecoration: 'none',
            }}
          >
            About Us 
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#contact"
            sx={{
              fontWeight:"500",
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: '#2B2B2B',
              textDecoration: 'none',
            }}
          >
            Contact Us
          </Typography>
          <a href="/#home">
            <Box >
              <img src={LogoImg} alt="" />
            </Box>
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#accommodation"
            sx={{
              fontWeight:"500",
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: '#2B2B2B',
              textDecoration: 'none',
            }}
          >
            Accommodations
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/policy"
            sx={{
              fontWeight:"500",
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: '#2B2B2B',
              textDecoration: 'none',
            }}
          >
            Policy
          </Typography>
          
        </Box>
        <IconButton  sx={{display:{md:"none",xs:"block"},position:"absolute",top:"50%",right:"1em",transform:"translateY(-50%)"}}  onClick={toggleDrawer("right", true)}>
          <MenuIcon/>
        </IconButton>
      </Container>
      <Drawer
        anchor={"right"}
        open={state["right"]}      
        onClose={toggleDrawer("right", false)}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <List>
            <ListItem  disablePadding component={Link} to={"/#aboutUs"} >
              <ListItemButton>
                <Typography variant="body1" color="initial">
                  <ListItemText primary={"About Us"} />
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding component={Link} to={"/#contact"} >
              <ListItemButton>
                <Typography variant="body1" color="initial">
                  <ListItemText primary={"Contact Us"} />
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding component={Link} to={"/#accommodation"} >
              <ListItemButton>
                <Typography variant="body1" color="initial">
                  <ListItemText primary={"Accommodations"} />
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding component={Link} to={"/policy"} >
              <ListItemButton>
                <Typography variant="body1" color="initial">
                  <ListItemText primary={"Policy"} />
                </Typography>
              </ListItemButton>
            </ListItem>
            
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}