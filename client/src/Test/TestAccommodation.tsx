import React, {useState} from 'react'

import { 
  Button
} from '@mui/material'

import useAccommodation from '../Hooks/useAccommodation';

export default function TestAccommodation() {

  const { createAccommodation, updateAccommodation, createShift, updateShift } = useAccommodation();

  const [fees, setFees] = useState([])
  const [form, setForm] = useState({
    description: '',
    pax: '',
    image: '',
    type: ''
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // createAccommodation({
    //   description: 'test accommodation',
    //   pax: '3',
    //   image: 'https://firebasestorage.googleapis.com/v0/b/metazare-clients.appspot.com/o/oasms%2F306045609_454801266669291_7037752651304713490_n.jfif-5d918a62-e530-49ea-a27c-9edac05e8f80?alt=media&token=9c8382a9-0b45-448e-95f5-0c84d2c03f49',
    //   type: 'room',
    //   fees: [
    //     {
    //       shift: 'day',
    //       rate: 150,
    //       adultFee: 150,
    //       kidsFee: 100
    //     },
    //     {
    //       shift: 'night',
    //       rate: 250,
    //       adultFee: 250,
    //       kidsFee: 200
    //     },
    //     {
    //       shift: 'whole day',
    //       rate: 350,
    //       adultFee: 350,
    //       kidsFee: 300
    //     }
    //   ]
    // })
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