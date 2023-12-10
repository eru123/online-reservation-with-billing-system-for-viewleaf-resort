import React from 'react'

import { 
  Button
} from '@mui/material'

import { useAuth } from '../Hooks/useAuth';
import useFeedback from '../Hooks/useFeedback';

export default function TestFeedback() {

  const { createFeedback } = useFeedback();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    createFeedback({
      reservationId: "MixO0niq",
      rating: 5,
      review: "Pagod nako"
    });
  }
  

  return (
    <div>
      <form onSubmit={submit}>
        <Button variant="contained" color="primary" type='submit'>
          Test
        </Button>
      </form>
    </div>
  )
}