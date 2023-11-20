import React, {useState, useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'

import { useAuth } from '../Hooks/useAuth';

export default function TestCreateStaff() {

  const { register } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    register(form);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({...form, username: e.target.value})}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <Button variant="contained" color="primary" type='submit'>
          Login
        </Button>
      </form>
    </div>
  )
}