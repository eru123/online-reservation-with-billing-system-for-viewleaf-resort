import React,{useState} from 'react'
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
                            <Typography variant="body1" color="initial" textAlign={"justify"}>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..</Typography>
                        </Box>
                    :""}
                </Paper>
                <Paper variant="elevation" elevation={3} >
                    <Box display="flex" alignItems={"center"}>
                        <Box flexGrow={"1"} onClick={()=>handleAccordionOpen("faq")} sx={{cursor:"pointer",padding:"1em"}} >
                            <Typography variant="h6" color="initial">Frequently Ask Questions</Typography>
                        </Box>
                        <IconButton aria-label="" onClick={()=>{setOpen("editFAQ")}}>
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
                            <Box >
                                <Box display="flex" alignItems={"center"} marginBottom={".2em"} >
                                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" fontWeight={500} color="initial" textAlign={"justify"}>Question #1</Typography>
                                    <IconButton aria-label="" onClick={() => {setOpen("editFAQ")}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="" onClick={() => {setOpen("deleteFAQ")}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="initial" textAlign={"justify"}>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..</Typography>
                            </Box>
                            <Box >
                                <Box display="flex" alignItems={"center"} marginBottom={".2em"} >
                                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" fontWeight={500} color="initial" textAlign={"justify"}>Question #2</Typography>
                                    <IconButton aria-label="" onClick={() => {setOpen("editFAQ")}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="" onClick={() => {setOpen("deleteFAQ")}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="initial" textAlign={"justify"}>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..</Typography>
                            </Box>
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
                    
                    {open === "editFAQ"?<>
                        <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                            Frequently Ask Question
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                            Manage List
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    id="Question"
                                    label="Question"
                                    fullWidth
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="answer"
                                    label="Answer"
                                    fullWidth
                                    multiline
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
                                <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    
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
                                <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                    Confirm
                                </Button>
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="about"
                                    label="Content"
                                    fullWidth
                                    multiline
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
                                <Button variant="contained" color='primary' fullWidth onClick={()=>setOpen("")}>
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    
                    </>:""}
                </Box>
            </Modal>
        </div>
    )
}

export default Content