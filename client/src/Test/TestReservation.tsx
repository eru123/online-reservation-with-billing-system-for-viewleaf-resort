import React, {useState} from 'react'

import { 
  Button
} from '@mui/material'

import useReservation from '../Hooks/useReservation';

export default function TestReservation() {

  const { createReservation, getReservation, payReservation, updateReservation } = useReservation();
  const [reservationId, setReservationId] = useState("");
  const [form, setForm] = useState({
    name: "Jane Doe",
    email: "jane@test.com",
    phone: "0912345678",
    schedule: 1701273600000,
    accommodations: [
      {
        accommodationId: "-Y-DsIcys1b5t6AflYazcp0SFw5l0llrxI",
        shift: "day",
        guests: {
          adult: 1,
          children: 2,
          senior: 3,
          pwd: 4
        },
        inclusions: [
          {
            name: "Pillows",
            quantity: 5
          }
        ]
      }
    ]
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form)
    // createReservation({...form})
    getReservation({
      reservationId: "SNKbs-phJ1RuoGLGcZg6yB0y1ccfCTrCyv"
    })
    // payReservation({
    //   reservationId: "7CZ-sIdws1XahsSu7ncj2ojWCXEB-Fo_Ng",
    //   receipt: "test"
    // })
    // updateReservation({
    //   reservationId: "7CZ-sIdws1XahsSu7ncj2ojWCXEB-Fo_Ng",
    //   status: "approved",
    //   note: "testing"
    // })
  }
  
  return (
    <div>
      <form onSubmit={submit}>
        <Button variant="contained" color="primary" type='submit'>
          Create
        </Button>
      </form>
    </div>
  )
}