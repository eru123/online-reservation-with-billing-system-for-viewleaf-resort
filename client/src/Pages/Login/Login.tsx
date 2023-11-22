import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import LogoImage from '../../Images/ViewLeafLogo.jpg'

import { useAuth } from '../../Hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleLogin = (e: React.FormEvent) => {
    // Implement your login logic here
    e.preventDefault();
    login(form)
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
        
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{marginTop:"25px"}}
            type="submit"
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
