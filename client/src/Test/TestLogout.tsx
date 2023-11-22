import React from 'react'

import { 
  Button
} from '@mui/material'

import { useAuth } from '../Hooks/useAuth';

export default function TestLogout() {

  const { logout } = useAuth();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  }
  

  return (
    <div>
      <form onSubmit={handleLogout}>
        <Button variant="contained" color="primary" type='submit'>
          Logout
        </Button>
      </form>
    </div>
  )
}