import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LogoImg from '../../Images/LogoDrop.png'


export default function Header() {
  return (
    <AppBar position="static" sx={{background:"white",height:"80px",zIndex:"1000",position:"fixed",top:"0"}}>
      <Container maxWidth="xl">
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
      </Container>
    </AppBar>
  )
}