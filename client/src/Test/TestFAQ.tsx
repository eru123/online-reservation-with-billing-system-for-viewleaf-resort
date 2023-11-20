import React, {useEffect} from 'react'

import { 
  Button, 
  TextField,
  Typography
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


import useFAQ from '../Hooks/useFAQ'

export default function TestFAQ() {
  const {data, loading, error, getFAQ, createFAQ, updateFAQ, deleteFAQ} = useFAQ();

  const [form, setForm] = React.useState({
    question: '',
    answer: '',
  })

  const handleCreateFAQ = (content: any) => {
    createFAQ(content)
  }

  useEffect(() => {
    getFAQ();
  }, [])

  return (
    <div>
      <h1>FAQ</h1>
      <TextField 
        id="question"
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.question}
        onChange={(e) => setForm({...form, question: e.target.value})}
      />
      <TextField
        id="answer"
        label="Answer"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={form.answer}
        onChange={(e) => setForm({...form, answer: e.target.value})}
      />
      <Button variant="contained" color="primary" onClick={() => handleCreateFAQ(form)}>
        Create
      </Button>

      {data?.map((faq: any) => {
        return (
          <div>
            <Typography variant="h6" color="initial">{faq.question}</Typography>
            <Typography variant="h6" color="initial">{faq.answer}</Typography>

            <Button 
              variant="contained" 
              color="primary" 
              onClick={()=>{
                updateFAQ({...faq, question: form.question, answer: form.answer})
              }}
            >
              Update
            </Button>
            <Button variant="contained" color="error" onClick={() => deleteFAQ(faq)}>
              Delete
            </Button>
          </div>
        )
      })}
    </div>
  )
}