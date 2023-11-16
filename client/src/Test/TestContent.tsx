import React, {useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'


import useContent from '../Hooks/useContent'

export default function TestContent() {
  const { data, loading, error, getContent, updateContent } = useContent();

  const [form, setForm] = React.useState({
    about: '',
    phone: '',
    email: '',
    address: '',
    policy: '',
    payment: '',
    promo: '',
  })

  const handleUpdateContent = (content: any) => {
    updateContent(content)
  }

  useEffect(() => {
    getContent();
    setForm({
      about: data?.about,
      phone: data?.phone,
      email: data?.email,
      address: data?.address,
      policy: data?.policy,
      payment: data?.payment,
      promo: data?.promo,
    })
  }, [])

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <h1>Content</h1>
      <TextField 
        id="about"
        label="About"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.about}
        onChange={(e) => setForm({...form, about: e.target.value})}
      />
      <TextField 
        id="phone"
        label="phone"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.phone}
        onChange={(e) => setForm({...form, phone: e.target.value})}
      />
      <TextField 
        id="email"
        label="email"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
      />
      <TextField 
        id="address"
        label="address"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.address}
        onChange={(e) => setForm({...form, address: e.target.value})}
      />
      <TextField 
        id="policy"
        label="policy"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.policy}
        onChange={(e) => setForm({...form, policy: e.target.value})}
      />
      <TextField 
        id="payment"
        label="payment"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.payment}
        onChange={(e) => setForm({...form, payment: e.target.value})}
      />
      <TextField 
        id="promo"
        label="promo"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={data?.promo}
        onChange={(e) => setForm({...form, promo: e.target.value})}
      />
     
      <Button variant="contained" color="primary" onClick={() => handleUpdateContent(form)}>
        Create
      </Button>

    </div>
  )
}