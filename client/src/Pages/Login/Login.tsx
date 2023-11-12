import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import LogoImage from '../../Images/ViewLeafLogo.jpg'
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <Container maxWidth="sm" sx={{height:"100vh", minHeight:"100vh", maxHeight:"600px", display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Box display={"flex"} alignItems={"center"} gap={"20px"} mb={"40px"}>
          <img src={LogoImage} height={"100px"} alt="" />
          <Box >
            <Typography variant="h4" fontWeight={700} color="primary">Login</Typography>
            <Typography variant="body1" color="initial">Manage the website</Typography>
          </Box>
        </Box>
        
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{marginTop:"25px"}}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
