import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RequestsCard from '../../../Components/RequestsCard';
import useReservation from '../../../Hooks/useReservation';

function Requests() {
  const { data: reservations, loading: reservationLoading, getReservation } = useReservation();
  const [requestReservation, setRequestReservation] = useState();
  const [anchorElMoreMenu, setAnchorElMoreMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMoreMenu);
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    getReservation();
  }, []);

  useEffect(() => {
    // Filter reservations based on specific statuses
    if (reservations) {
      const filtered = reservations.filter(
        (reservation:any) => ['paid', 'rescheduling', 'cancelling', 'refunding'].includes(reservation.status)
      );
  
      // Sort the filtered reservations based on updatedAt in descending order
      const sortedReservations = filtered.sort(
        (a:any, b:any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  
      setFilteredReservations(sortedReservations);
      console.log(sortedReservations);
    }
  }, [reservations]);
  

  if (reservationLoading) return <>loading</>;

  return (
    <>
      <div>
        <Typography variant="h4" fontWeight={600} color="primary">
          Reservation Requests
        </Typography>
        <Typography variant="h6" fontWeight={400} color="initial" sx={{ marginBottom: '2em' }}>
          Here are all the list of reservation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection={'column'} gap={'15px'}>
              {filteredReservations.map((reservation:any) => (
                <RequestsCard  status={reservation?.status} data={reservation} />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Menu
          id="basic-menu"
          anchorEl={anchorElMoreMenu}
          open={openMenu}
          onClose={() => setAnchorElMoreMenu(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => setAnchorElMoreMenu(null)}>View Invoice</MenuItem>
          <MenuItem onClick={() => setAnchorElMoreMenu(null)}>Additional</MenuItem>
          <MenuItem onClick={() => setAnchorElMoreMenu(null)}>Reschedule</MenuItem>
          <MenuItem onClick={() => setAnchorElMoreMenu(null)}>Cancel</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default Requests;
