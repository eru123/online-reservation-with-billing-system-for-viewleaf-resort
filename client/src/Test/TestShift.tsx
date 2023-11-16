import React, {useState, useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'

import useContent from '../Hooks/useContent'

export default function TestShift() {
  const { data, loading, error, getShift, updateShift } = useContent();

  const [form, setForm] = useState<any>({
    day: {
      start: '',
      end: ''
    },
    night: {
      start: '',
      end: ''
    },
    whole: {
      start: '',
      end: ''
    }
  })

  const handleUpdateShift = (content: any) => {
    console.log(content)

    updateShift(content)
  }

  useEffect(() => {
    getShift();
    setForm({
      day: {
        start: data?.shift?.day?.start,
        end: data?.shift?.day?.end
      },
      night: {
        start: data?.shift?.night?.start,
        end: data?.shift?.night?.end
      },
      whole: {
        start: data?.shift?.whole?.start,
        end: data?.shift?.whole?.end
      }
    })
  }, [])

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <h1>Content</h1>
      <Typography variant="h6">Day</Typography>
      <TextField
        id="dayStart"
        label="Day Start"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.day?.start}
        onChange={(e) => setForm({...form, day: {...form.day, start: e.target.value}})}
      />
      To
      <TextField
        id="day End"
        label="Day End"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.day?.end}
        onChange={(e) => setForm({...form, day: {...form.day, end: e.target.value}})}
      />

      <Typography variant="h6">Night</Typography>
      <TextField
        id="nightStart"
        label="night Start"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.night?.start}
        onChange={(e) => setForm({...form, night: {...form.night, start: e.target.value}})}
      />
      To
      <TextField
        id="night End"
        label="night End"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.night?.end}
        onChange={(e) => setForm({...form, night: {...form.night, end: e.target.value}})}
      />

      <Typography variant="h6">Whole</Typography>
      <TextField
        id="wholeStart"
        label="whole Start"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.whole?.start}
        onChange={(e) => setForm({...form, whole: {...form.whole, start: e.target.value}})}
      />
      To
      <TextField
        id="whole End"
        label="whole End"
        variant="outlined"
        margin="normal"
        defaultValue={data?.shift?.whole?.end}
        onChange={(e) => setForm({...form, whole: {...form.whole, end: e.target.value}})}
      />

      <Button variant="contained" color="primary" onClick={() => handleUpdateShift(form)}>
        Update
      </Button>

    </div>
  )
}