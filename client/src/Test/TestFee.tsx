import React, {useState, useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'

import useContent from '../Hooks/useContent'

export default function TestFee() {
  const { data, loading, error, getFee, updateFee } = useContent();

  const [form, setForm] = useState<any>({
    kid: 0,
    adult: 0,
    senior: 0,
  })

  const handleUpdateFee = (content: any) => {
    console.log(content)
    updateFee(content)
  }

  useEffect(() => {
    getFee();
    setForm({
      kid: data?.fee?.kid,
      adult: data?.fee?.adult,
      senior: data?.fee?.senior,
    })
  }, [])

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <h1>Content</h1>
      <Typography variant="h6">Kid</Typography>
      <TextField
        id="kid"
        label="Kid"
        variant="outlined"
        margin="normal"
        fullWidth
        type='number'
        defaultValue={data?.fee?.kid}
        onChange={(e) => setForm({...form, kid: e.target.value})}
      />
      <Typography variant="h6">Adult</Typography>
      <TextField
        id="adult"
        label="Adult"
        variant="outlined"
        margin="normal"
        fullWidth
        type='number'
        defaultValue={data?.fee?.adult}
        onChange={(e) => setForm({...form, adult: e.target.value})}
      />
      <Typography variant="h6">Senior</Typography>
      <TextField
        id="senior"
        label="Senior"
        variant="outlined"
        margin="normal"
        fullWidth
        type='number'
        defaultValue={data?.fee?.senior}
        onChange={(e) => setForm({...form, senior: e.target.value})}
      />

      <Button variant="contained" color="primary" onClick={() => handleUpdateFee(form)}>
        Update
      </Button>

    </div>
  )
}