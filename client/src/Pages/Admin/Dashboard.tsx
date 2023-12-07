import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ReportCard from '../../Components/ReportCard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import useReservation from '../../Hooks/useReservation';

function Dashboard() {
  const { data: reservations, loading: reservationLoading, getReservation } = useReservation();
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportCardValue,setReportCardValue] = useState(0);
  function getTotalAccommodation(reservations: any): number {
    let totalAccommodation = 0;
  
    for (const reservation of reservations) {
      // Check if reservation has invoices and invoices is an array with at least one element
      if (
        reservation?.invoices &&
        Array.isArray(reservation.invoices) &&
        reservation.invoices.length > 0
      ) {
        totalAccommodation += reservation.invoices.length;
      }
    }
    return totalAccommodation;
  }
  
  useEffect(() => {
    getReservation();
  }, []);

  useEffect(() => {
    // Filter reservations based on specific statuses and today's date
    if (reservations) {
      const currentDate = new Date().toISOString().split('T')[0]; // Get today's date
      const filtered = reservations.filter((reservation:any) => {
        const scheduleDate = new Date(reservation.schedule).toISOString().split('T')[0];
        return (
          ['approved', 'rescheduling'].includes(reservation.status) && scheduleDate === currentDate 
        );
      });
      setFilteredReservations(filtered);
      setReportCardValue(getTotalAccommodation(filtered))
    }
  }, [reservations]);
  
  if (reservationLoading) return <>loading</>;

  return (
    <div>
      <Typography variant="h4" fontWeight={600} color="primary">
        Dashboard
      </Typography>
      <Typography variant="h6" fontWeight={400} color="initial" sx={{ marginBottom: "2em" }}>
        Here are the list of reservation for today
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Box display="flex" gap={"15px"}>
            <Box sx={{ flexGrow: "1" }}>
              <Box sx={{ display: 'flex', alignItems: 'center', background: "white", width: "300px", padding: "0 0 0 .5em", border: "1px solid #B5B5B5", borderRadius: "8px" }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <input
                  placeholder='Search...'
                  type="text"
                  style={{ border: "none", outline: "none", height: "38px", width: "100%", marginRight: "5px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
            </Box>
            <Button variant="contained" color="primary" href='/admin/reservation/create'>
              Add Reservation
            </Button>
          </Box>

          <TableContainer sx={{ marginTop: "25px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reference No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Check In </TableCell>
                  <TableCell>Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReservations.map((reservation: any) => (
                  <TableRow key={reservation.reservationId} sx={{ background: "#D7D7D7" }} component={Link}  to={`/admin/invoice/${reservation.reservationId}`}>
                    <TableCell>{`${reservation.reservationId.substring(0, 4)}...${reservation.reservationId.substring(reservation.reservationId.length - 4)}`}</TableCell>
                    <TableCell>{reservation.customer.name}</TableCell>
                    <TableCell>{new Date(reservation.schedule).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                    <TableCell align='center'><Chip label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)} color="primary" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={3}>
          <Box display="flex" flexDirection={"column"} gap={"15px"} >
            <ReportCard variant='reservation' title={"Today’s Reservation"} value={filteredReservations?.length} />
            <ReportCard variant='accommodation' title={"Today’s Accommodation"} value={reportCardValue} />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard;
