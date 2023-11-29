import React,{useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import { Grid,Button, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import useStaff from '../../../Hooks/useStaff'

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

function ManageStaffs() {
  const {data: staffs, loading: staffLoading, error: staffError, getStaff} = useStaff();
  const {data: credentials, loading: credLoading, error: credError, registerStaff} = useStaff();
  const [form, setForm] = useState({
    username: "",
    email: "",
  })
  
  async function createStaff(e: React.FormEvent) {
    e.preventDefault();
    setOpen("credential");
    registerStaff(form);
    console.log(form);
  }

  useEffect(()=>{
    getStaff()
  }, [])

    const [open, setOpen] = useState("");
    return <>
        <Typography variant="h4" fontWeight={600} color="primary">Manage Staffs</Typography>
        <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of Registered Staffs</Typography>
        <TableContainer sx={{marginTop:"25px"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell >Staff Id</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell align='right'>
                            <Button variant="contained" color="primary" onClick={()=>{setOpen("addStaff")}}>
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                  {staffs?.map((staff:any)=>(
                    <TableRow sx={{background:"#D7D7D7"}}>
                        <TableCell >{staff.username}</TableCell>
                        <TableCell >{staff.staffId}</TableCell>
                        <TableCell >{staff.email}</TableCell>
                        <TableCell align='right'>
                            {/* <IconButton aria-label="" onClick={()=>{setOpen("delete")}}>
                                <DeleteIcon/> 
                            </IconButton> */}
                        </TableCell>
                    </TableRow>

                  ))}
                    
                    
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
            keepMounted
            open={!(open==="")}
            onClose={()=>{setOpen("")}}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
            {open === "addStaff"?<>
                <form onSubmit={createStaff}>
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                        Add New Staff
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                        Fill up the details of the instructor
                    </Typography>
                    <Grid container spacing={2} mt={3}>
                        <Grid item  xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Full Name"
                                value={form.username}
                                onChange={(e)=>{setForm({...form,username:e.target.value})}}
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                label="Email"
                                value={form.email}
                                onChange={(e)=>{setForm({...form,email:e.target.value})}}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} mt={4}>
                        <Grid item sm={4} xs={12}>
                            <Button variant="text" fullWidth color='primary' onClick={()=>{setOpen("")}}>
                                cancel
                            </Button>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <Button variant="contained" fullWidth color="primary" type='submit' >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>:""}

            {open === "credential"?<>
                <form action="">
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                        Add New Instructor
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                        Give the credential to the new instructor
                    </Typography>
                    <Grid container spacing={2} mt={3}>
                        <Grid item  xs={12}>
                            <Typography variant="subtitle2" color="initial">Email</Typography>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={"text"}
                                    // value={credential.email}
                                    disabled
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>{
                                          navigator.clipboard.writeText(credentials?.email);
                                        }}
                                        edge="end"
                                        >
                                            <ContentCopyIcon /> 
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    value={credentials?.email}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item  xs={12}>
                          <Typography variant="subtitle2" color="initial">Password</Typography>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={"text"}
                                    // value={credential.email}
                                    disabled
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={()=>{
                                            navigator.clipboard.writeText(credentials?.password);
                                          }}
                                          edge="end"
                                        >
                                            <ContentCopyIcon /> 
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    value={credentials?.password}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} mt={4}>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("")}}>
                                Done
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>:""}

            {open === "delete"?<>
                <form action="">
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                        Delete Staff
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                        Are you sure you want to delete this Staff?
                    </Typography>
                    <Grid container spacing={1} mt={4}>
                        <Grid item sm={4} xs={12}>
                            <Button variant="text" fullWidth color='primary' onClick={()=>{setOpen("")}}>
                                cancel
                            </Button>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("Credential")}}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>:""}
            </Box>
        </Modal>
    </>
}

export default ManageStaffs