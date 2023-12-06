import React,{useState,useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TESTCalendar from '../../../Components/TESTCalendar';
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import SearchInputReservation from '../../../Components/SearchInputReservation';

import useReservation from '../../../Hooks/useReservation';

function ListReservation() {
  const {data:reservations,loading: reservationLoading , getReservation} =  useReservation();

  const [filteredData,setFilteredData] = useState<any>();

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>()
  const [anchorElMoreMenu, setAnchorElMoreMenu] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMoreMenu);
  
  useEffect(()=>{
    getReservation()
  },[])

  if (reservationLoading)return <div>loading</div>
  return <>
      <div>
          <Typography variant="h4" fontWeight={600} color="primary">Reservation Lists</Typography>
          <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>Here are all the list of reservation</Typography>
          <Grid container spacing={2} alignItems={"start"}>
              <Grid item  md={9}>
                  <Box display="flex"  gap={"15px"}>
                      <Box sx={{flexGrow:"1"}}>
                        <SearchInputReservation data={reservations} setFilteredData={setFilteredData}/>
                      </Box>
                      <Button variant="contained" color="primary" href='/admin/reservation/create'>
                          Add Reservation
                      </Button>
                  </Box>

                  <TableContainer sx={{marginTop:"25px"}}>
                      <Table aria-label="simple table">
                          <TableHead>
                              <TableRow>
                                  <TableCell>Reference No.</TableCell>
                                  <TableCell >Name</TableCell>
                                  <TableCell >Date</TableCell>
                                  <TableCell >Check In </TableCell>
                                  <TableCell >Check Out </TableCell>
                                  <TableCell >Status </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                          {filteredData?.length <= 0 ? <>"No reservation"</> : (
                            <>
                              {filteredData?.map((reservation: any) => (
                                <TableRow key={reservation.reservationId} sx={{ background: "white" }} component={Link} to={`/admin/invoice/${reservation.reservationId}`} >
                                  <TableCell>{`${reservation.reservationId.substring(0, 4)}...${reservation.reservationId.substring(reservation.reservationId.length - 4)}`}</TableCell>
                                  <TableCell>{reservation.customer?.name || "Unknown"}</TableCell>
                                  <TableCell>{new Date(reservation.schedule).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell align='center'>
                                    <Chip 
                                      label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)} 
                                      color={reservation.status === 'cancelled' ? "error" : (reservation.status === "approved" ? "success" : "info")}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </>
                          )}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Grid>
              <Grid item  md={3} sx={{display:"flex"}}>
                  <Paper variant="elevation" elevation={3}>
                    {filteredData && 
                      <TESTCalendar
                        appointments={filteredData}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                      />
                    }
                  </Paper>
              </Grid>
          </Grid>
          <Menu
              id="basic-menu"
              anchorEl={anchorElMoreMenu}
              open={openMenu}
              onClose={()=>setAnchorElMoreMenu(null)}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
          >
              <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>View Invoice</MenuItem>
              <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Additional</MenuItem>
              <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Reschedule</MenuItem>
              <MenuItem onClick={()=>setAnchorElMoreMenu(null)}>Cancel</MenuItem>
          </Menu>
      </div>
  </>
    
}

export default ListReservation