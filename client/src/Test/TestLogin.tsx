import React, {useState, useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'

import { useAuth } from '../Hooks/useAuth';

export default function TestLogin() {

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    // login(form);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
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