import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Grid,Button, TextField } from '@mui/material'
import TESTCalendar from '../../../Components/TESTCalendar'

import useFAQ from '../../../Hooks/useFAQ'
import useContent from '../../../Hooks/useContent'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px"
};

function Content() {
    const [open, setOpen] = useState("");
    const [accordionOpen,setAccordionOPen] = useState("");
    const handleAccordionOpen = (value:string) =>{
        if(accordionOpen === value){
            setAccordionOPen("");
        }else{
            setAccordionOPen(value);
        }
    }

    const {data: faqs, loading: faqLoading, error: faqError, getFAQ, createFAQ, updateFAQ, deleteFAQ} = useFAQ();
    const {data: contents, loading: contentLoading, error: contentError, getContent, updateContent} = useContent();

    const [form, setForm] = React.useState({
      question: '',
      answer: '',
    })

    const [about, setAbout] = useState("");

    const [selectedFaq, setSelectedFaq] = useState<any>(null);

    const clearForm = () => {
      // Close Modal
      setOpen("")

      // Clear Form
      setForm({
        question: '',
        answer: '',
      })
      setAbout("")
    }

    const handleCreateFAQ: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Create FAQ
      createFAQ(form)

      // Clear Selected FAQ
      setSelectedFaq(null)

      // Refresh data
      getFAQ();
      getFAQ();
      getFAQ();

      // Clear Form
      clearForm()
    }

    const handleEditFAQ: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Edit FAQ
      updateFAQ({
        ...selectedFaq,
        question: form.question,
        answer: form.answer
      })

      // Refresh data
      getFAQ();
      getFAQ();
      getFAQ();

      // Clear Form
      clearForm()
    }

    const handleDeleteFaq: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Edit FAQ
      deleteFAQ(selectedFaq)

      // Refresh data
      getFAQ();
      getFAQ();
      getFAQ();

      // Clear Form
      clearForm()
    }

    const handleEditAbout: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Edit About
      updateContent({
        about: about
      })

      // Refresh data
      getFAQ();
      getFAQ();
      getFAQ();

      // Clear Form
      clearForm()
    }

    useEffect(() => {
      getFAQ();
      getContent();
    }, [])

    if (faqLoading || contentLoading) return <p>Loading...</p>
    if (faqError || contentError) return <p>Error</p>

    return (
        <div>
            <Typography variant="h4" fontWeight=  {600} color="primary">Manage Contents</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Update information all throughout the page</Typography>

            <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                <Paper variant="elevation" elevation={3} >
                    <Box display="flex" alignItems={"center"}>
                        <Box flexGrow={"1"} onClick={()=>handleAccordionOpen("about")} sx={{cursor:"pointer",padding:"1em"}} >
                            <Typography variant="h6" color="initial">About</Typography>
                        </Box>
                        <IconButton aria-label="" onClick={()=>{setOpen("editAbout")}}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            aria-label=""
                            onClick={() => handleAccordionOpen("about")}
                            sx={{
                                transform: `rotate(${accordionOpen === "about" ? "90deg" : "0"})`,
                            }}
                            >
                            <NavigateNextIcon />
                        </IconButton>
                    </Box>

                    {accordionOpen === "about"?
                        <Box sx={{padding:"0 1em 1em"}}>
                            <hr style={{marginBottom:"1em"}}/>
                            <Typography variant="body1" color="initial" textAlign={"justify"}>{contents?.about}</Typography>
                        </Box>
                    :""}
                </Paper>
                <Paper variant="elevation" elevation={3} >
                    <Box display="flex" alignItems={"center"}>
                      
                        <Box flexGrow={"1"} onClick={()=>handleAccordionOpen("faq")} sx={{cursor:"pointer",padding:"1em"}} >
                            <Typography variant="h6" color="initial">Frequently Ask Questions</Typography>
                        </Box>
                        <IconButton aria-label="" onClick={()=>{setOpen("addFAQ")}}>
                            <AddIcon/>
                        </IconButton>
                        <IconButton
                            aria-label=""
                            onClick={() => handleAccordionOpen("faq")}
                            sx={{
                                transform: `rotate(${accordionOpen === "faq" ? "90deg" : "0"})`,
                            }}
                            >
                            <NavigateNextIcon />
                        </IconButton>
                    </Box>

                    {accordionOpen === "faq"?

                      
                        <Box sx={{padding:"0 1em 1em"}}>
                            <hr style={{marginBottom:"1em"}}/>
                            {Array.isArray(faqs) && faqs?.map((faq: any) => (
                              <Box >
                                  <Box display="flex" alignItems={"center"} marginBottom={".2em"} >
                                      <Typography sx={{flexGrow:"1"}} variant="subtitle1" fontWeight={500} color="initial" textAlign={"justify"}>{faq.question}</Typography>
                                      <IconButton aria-label="" onClick={() => {
                                        setOpen("editFAQ")
                                        setSelectedFaq(faq)
                                      }}>
                                          <EditIcon />
                                      </IconButton>
                                      <IconButton aria-label="" onClick={() => {
                                        setOpen("deleteFAQ")
                                        setSelectedFaq(faq)
                                      }}>
                                          <DeleteIcon />
                                      </IconButton>
                                  </Box>
                                  <Typography variant="body2" color="initial" textAlign={"justify"}>{faq.answer}</Typography>
                              </Box>
                            ))}
                        </Box>
                    :""}
                </Paper>
            </Box>
            <Modal
                keepMounted
                open={!(open==="")}
                onClose={()=>{setOpen("")}}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    
                    {open === "addFAQ"?<>
                        <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                            Frequently Ask Question
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                            Manage List
                        </Typography>
                        <form onSubmit={handleCreateFAQ}>
                          <Grid container spacing={2}>
                              <Grid item xs={12} >
                                  <TextField
                                      id="Question"
                                      label="Question"
                                      fullWidth
                                      multiline
                                      value={form.question}
                                      onChange={(e) => setForm({...form, question: e.target.value})}
                                  />
                              </Grid>
                              <Grid item xs={12} >
                                  <TextField
                                      id="answer"
                                      label="Answer"
                                      fullWidth
                                      multiline
                                      value={form.answer}
                                      onChange={(e) => setForm({...form, answer: e.target.value})}
                                  />
                              </Grid>
                              
                              <Grid item xs={12} padding={"1em 0"}>
                                  
                              </Grid>
                              <Grid item xs={5}>
                                  <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                      back
                                  </Button>
                              </Grid>
                              <Grid item xs={7}>
                                  <Button variant="contained" color='primary' fullWidth type='submit'>
                                      Confirm
                                  </Button>
                              </Grid>
                          </Grid>
                        </form>
                    </>:""}
                    {open === "editFAQ"?<>
                        <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                            Frequently Ask Question
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                            Manage List
                        </Typography>
                        <form onSubmit={handleEditFAQ}>
                          <Grid container spacing={2}>
                              <Grid item xs={12} >
                                  <TextField
                                      id="Question"
                                      label="Question"
                                      fullWidth
                                      multiline
                                      defaultValue={selectedFaq.question}
                                      onChange={(e) => setForm({...form, question: e.target.value})}
                                  />
                              </Grid>
                              <Grid item xs={12} >
                                  <TextField
                                      id="answer"
                                      label="Answer"
                                      fullWidth
                                      multiline
                                      defaultValue={selectedFaq.answer}
                                      onChange={(e) => setForm({...form, answer: e.target.value})}
                                  />
                              </Grid>
                              
                              <Grid item xs={12} padding={"1em 0"}>
                                  
                              </Grid>
                              <Grid item xs={5}>
                                  <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                      back
                                  </Button>
                              </Grid>
                              <Grid item xs={7}>
                                  <Button variant="contained" color='primary' fullWidth type='submit'>
                                      Confirm
                                  </Button>
                              </Grid>
                          </Grid>
                        </form>
                    </>:""}
                    {open === "deleteFAQ"?<>
                        <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                            Delete Frequently Ask Question
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                            Are you sure you want to delete this?
                        </Typography>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={12} padding={"1em 0"}>
                                
                            </Grid>
                            <Grid item xs={5}>
                                <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                    back
                                </Button>
                            </Grid>
                            <Grid item xs={7}>
                              <form onSubmit={handleDeleteFaq}>
                                <Button variant="contained" color='primary' fullWidth type='submit'>
                                    Confirm
                                </Button>
                              </form>
                            </Grid>
                        </Grid>
                    </>:""}





                    {open === "editAbout"?<>
                        <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                            Edit About
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                            About Content
                        </Typography>
                        <form onSubmit={handleEditAbout}>
                          <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  id="about"
                                  label="Content"
                                  fullWidth
                                  multiline
                                  defaultValue={contents?.about}
                                  onChange={(e) => setAbout(e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={12} padding={"1em 0"}>

                              </Grid>
                              <Grid item xs={5}>
                                <Button variant="text" fullWidth onClick={()=>{setOpen("")}}>
                                  back
                                </Button>
                              </Grid>
                              <Grid item xs={7}>
                                  <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")} type='submit'>
                                    Confirm
                                  </Button>
                              </Grid>
                          </Grid>
                        </form>
                    </>:""}
                </Box>
            </Modal>
        </div>
    )
}

export default Content