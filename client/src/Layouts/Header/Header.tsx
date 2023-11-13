import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoImg from '../../Images/LogoDrop.png'


const pages = ['About', 'Services', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{background:"white",height:"80px",zIndex:"1000",position:"fixed",top:"0"}}>
      <Container maxWidth="xl">
        <Box display="flex"  sx={{gap:"40px",justifyContent:"center",alignItems:"center"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            href="/"
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
          <a href="/">
            <Box >
              <img src={LogoImg} alt="" />
            </Box>
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            href="/"
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
      </Container>
    </AppBar>
  )
}