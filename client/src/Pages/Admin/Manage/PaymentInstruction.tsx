import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Modal,Grid,TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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

function PaymentInstruction() {
    const [open, setOpen] = useState("");
    const {data:content, loading:contentLoading, error:contentError, getContent, updateContent} = useContent();
    const [promoVal,setPromoVal]= useState<string>("")
    const {
      downloadURL, 
      uploading, 
      uploadFile
    } = useFirebase();

    useEffect(()=>{
      getContent();
    },[])

    const handleEditPromo: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()

      // Edit Promo
      updateContent({promo: promoVal});
      
      // Refresh Data
      getContent();

      // Clear Form
      setPromoVal("")
      setOpen("")
    }

    if (contentLoading) {
      return <div>Loading...</div>;
    }

    return <>
        <div>
            <Typography variant="h4" fontWeight={600} color="primary">Manage Payment Instruction</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Update the instruction for the payment</Typography>
            <Box display="flex" sx={{margin:"2em 0"}}>
                <Box sx={{flexGrow:"1",display:"flex"}}>
                    <Box display="flex" gap={"10px"} alignItems={"center"} sx={{background:"#D9D9D9",border:"1px solid #B9B9B9",padding:".5em 1em",borderRadius:"1000px"}}>
                        <Box display={"flex"} gap={"8px"}>
                            <Typography variant="subtitle1" fontWeight={600} color="initial">Promo:</Typography>
                            <Typography variant="subtitle1" color="initial">{content?.promo}%</Typography>
                        </Box>
                        <IconButton aria-label="edit" onClick={()=>{setOpen("editPromo")}}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Button variant="contained" color="primary" onClick={()=>{setOpen("editPDF")}}>
                  Upload PDF
                </Button>
            </Box>
            <Box>
              <iframe
                title="PDF Viewer" 
                src={content?.payment} 
                width="100%"
                height="800px" 
              />
            </Box>
        </div>
        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                
                {open === "editPromo"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Edit Promo
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        
                    </Typography>
                    <form onSubmit={handleEditPromo}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} >
                          <TextField
                            type='number'
                            id="promo"
                            label="Promo Percentage(%)"
                            fullWidth
                            inputProps={{
                              min: 0, 
                              max: 100, 
                            }}
                            value={promoVal}
                            onChange={(e)=>{
                              setPromoVal(e.target.value)
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} padding={"1em 0"}>
                            
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="text" fullWidth onClick={()=>{setOpen("")}} sx={{color:"black"}}>
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
                {open === "editPDF"?<>
                    <Typography id="keep-mounted-modal-title" variant="h6" fontWeight={700} color={"primary"} component="h2">
                        Upload PDF
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{marginBottom:"15px"}}>
                        Set payment instruction for the guests
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                type='file'
                                id="promo"
                                fullWidth
                                onChange={(e:any)=>{uploadFile(e.target.files[0], 'orbs')}}
                                inputProps={{
                                  accept: '.pdf',
                                }}
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
                              updateContent({payment: downloadURL});
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

export default PaymentInstruction