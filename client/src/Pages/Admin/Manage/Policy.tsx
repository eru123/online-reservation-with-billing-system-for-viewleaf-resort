import React,{useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button'
import { Modal,Grid,TextField } from '@mui/material';

import useContent from '../../../Hooks/useContent';
import useFirebase from '../../../Hooks/useFirebase';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px",
    maxHeight:"90vh",
    overflowY:"scroll"
};

function Policy() {
    const [open, setOpen] = useState("");
    const {data:content, loading:contentLoading, error:contentError, getContent, updateContent} = useContent();
    const {
      downloadURL, 
      uploading, 
      uploadFile
    } = useFirebase();

    useEffect(()=>{
      getContent();
    },[])

    return <>
        <Typography variant="h4" fontWeight={600} color="primary">Manage Policy </Typography>
        <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Update your policy</Typography>
        <Box display="flex" sx={{margin:"2em 0"}}>
                <Box sx={{flexGrow:"1",display:"flex"}}>
                    
                </Box>
                <Button variant="contained" color="primary" onClick={()=>{setOpen("editPDF")}}>
                    Upload PDF
                </Button>
            </Box>
        <Box>
            <Box display="flex" justifyContent={"center"} alignItems={"center"}  minHeight={"800px"} sx={{background:"#B8B8B8",borderRadius:"12px"}}>   
                <PictureAsPdfIcon sx={{fill:"#626262",fontSize:"100px"}}/>
                <iframe
                  title="PDF Viewer" 
                  src={content?.policy} 
                  width="100%"
                  height="500px" // You can adjust the height based on your preference
                  frameBorder="0"
                />
            </Box>
        </Box>
        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                {open === "editPDF"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Upload PDF
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Set policy for the guests
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                type='file'
                                id="policy"
                                fullWidth
                            />
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={(e:any)=>{uploadFile(e.target.files[0], 'orbs')}}
                              id="file-upload-input"
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
                            <Button variant="contained" color='primary' fullWidth onClick={()=>{
                              setOpen("");
                              updateContent({policy: downloadURL});
                            }}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                
                </>:""}

            </Box>
        </Modal>
    </>
}

export default Policy