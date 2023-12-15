import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import { Grid,Button, TextField, IconButton } from '@mui/material'

import { useAuth } from '../../../Hooks/useAuth';
import useStaff from '../../../Hooks/useStaff';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"8px",
    maxHeight:"90vh",
    overflowY:"scroll"
};


function Profile() {
    const{User} = useAuth();
    const {data, loading, error, getStaff, updateStaff} = useStaff();
    const [open, setOpen] = useState("");

    const [form, setForm] = useState({
      staffId: "",
      username: "",
      email: "",
      contact: "",
      password: ""
    })

    const submit = () => {
      updateStaff(form)
      setOpen("");
    }

    useEffect(()=>{
      getStaff({
        staffId: User().staffId
      });
    }, [])

    return <>
      <Box display={"flex"} flexWrap={"wrap"}>
        <Box width={"300px"} >
            <Box position={"sticky"} sx={{display:"flex",flexDirection:"column",gap:"2em", alignItems:"center"}} top={"10px"} >
                <Avatar
                    alt={User().username}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 150, height: 150}}
                />
                {/* <Chip label="Change Photo" variant="outlined" onClick={()=>{setOpen("changePhoto")}} /> */}
            </Box>
        </Box>
        <Box flexGrow={"1"} minHeight={"100vh"} paddingTop={"20px"}>
            <Typography variant="h4" fontWeight={600} color="primary" mb={"15px"}>My Profile</Typography>
            <Box display={"flex"} mb={"10px"}>
              <Typography variant="h5" fontWeight={600} color="initial" sx={{flexGrow:"1"}}>Details</Typography>
              {/* <Chip label="Edit details" variant="outlined" onClick={()=>{setOpen("editDetails")}} /> */}
            </Box>
            <Typography variant="h6" color="initial">{User().username}</Typography>
            <Typography variant="subtitle2" color="#656565"  mb={"8px"}>FULL NAME</Typography>
            <Typography variant="h6" color="initial">{User().email}</Typography>
            <Typography variant="subtitle2" color="#656565"  mb={"8px"}>EMAIL</Typography>
            <Box display={"flex"} mb={"15px"} mt={"10px"}>
                <Typography variant="h5" fontWeight={600} color="initial" sx={{flexGrow:"1"}}>Password</Typography>
            </Box>
            <Chip label="Change Password" variant="outlined" onClick={()=>{setOpen("editPassword")}} />
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
          {open === "changePhoto"?<>
              <form action="">
                  <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Upload New Photo
                  </Typography>
                  <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      
                  </Typography>
                  <Grid container spacing={2} mt={3}>
                      <Grid item  xs={12}>
                          <TextField
                              type='file'
                              fullWidth
                              required
                              id="photo"
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
                          <Button variant="contained" fullWidth color="primary" onClick={()=>{}}>
                              upload
                          </Button>
                      </Grid>
                  </Grid>
              </form>
          </>:""}
          {open === "editDetails"?<>
              <form action="">
                  <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Edit Details
                  </Typography>
                  <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      
                  </Typography>
                  <Grid container spacing={2} mt={3}>
                      <Grid item  xs={12}>
                          <TextField
                              type='text'
                              fullWidth
                              required
                              label="Full Name"
                              id="name"
                          />
                      </Grid>
                      <Grid item  xs={12}>
                          <TextField
                              type='text'
                              fullWidth
                              required
                              label="Contact Number"
                              id="contact"
                          />
                      </Grid>
                      <Grid item  xs={12}>
                          <TextField
                              type='email'
                              fullWidth
                              required
                              label="Email"
                              id="email"
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
                          <Button variant="contained" fullWidth color="primary" onClick={()=>{}}>
                              Update
                          </Button>
                      </Grid>
                  </Grid>
              </form>
          </>:""}
          {open === "editPassword"?<>
              <form action="">
                  <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Edit Password
                  </Typography>
                  <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      
                  </Typography>
                  <Grid container spacing={2} mt={3}>
                      <Grid item  xs={12}>
                          <TextField
                              type='password'
                              fullWidth
                              required
                              label="Current Password"
                              id="currentPassword"
                          />
                      </Grid>
                      <Grid item  xs={12}>
                          <TextField
                              type='password'
                              fullWidth
                              required
                              label="New Password"
                              id="newPassword"
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
                          <Button variant="contained" fullWidth color="primary" onClick={()=>{}}>
                              Update
                          </Button>
                      </Grid>
                  </Grid>
              </form>
          </>:""}
        </Box>
      </Modal>
    </>
}

export default Profile