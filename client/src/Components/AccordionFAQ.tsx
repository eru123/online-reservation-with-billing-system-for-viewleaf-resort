import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore';


type Props = {
  question:string
  answer:string
}



function AccordionFAQ({question,answer}:Props) {
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-label="Expand"
            aria-controls="-content"
            id="-header"
        >
            <Typography variant='h6'>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant='body2' >{answer}</Typography>
        </AccordionDetails>
    </Accordion>
  )
}

export default AccordionFAQ