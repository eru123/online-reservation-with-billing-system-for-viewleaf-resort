import React,{useEffect,useState}from 'react'
import { Typography, Box, TextField, Button, IconButton } from '@mui/material'
import ReportCard from '../../../Components/ReportCard';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Chip from '@mui/material/Chip';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import dayjs from 'dayjs';
import useReservation from '../../../Hooks/useReservation';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { report } from 'process';

function Report() {
  const {data:reservations,loading:loadingReports,error,getReservation} = useReservation();
  const [reports, setReports] = useState([]);
  const [reportCardValue,setReportCardValue] = useState({
    TotalGuests:0,
    TotalAccommodation:0,
    TotalSales:0
  })

  const [dateFilterButton,setDateFilterButton] = useState("sortAToZ") // sortAToZ or sortZtoA
  const [dateFilterInput,setDateFilterInput] = useState({
    start:"",
    end:""
  })
  const handleDateChange = (e:any, field:string) => {
    // Update state correctly
    
    setDateFilterInput(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  function getTotalNumberOfGuests(reservations: any) {
    let totalGuests = 0;

    for (const reservation of reservations) {
      // Check if reservation has invoices and invoices is an array with at least one element
      if (
        reservation.invoices &&
        Array.isArray(reservation.invoices) &&
        reservation.invoices.length > 0
      ) {
        // Access the first invoice
        const firstInvoice = reservation.invoices[0];

        // Check if the first invoice has guests
        if (firstInvoice.guests) {
          const { adults = 0, senior = 0, pwd = 0, kids = 0 } = firstInvoice.guests;
          totalGuests += adults + senior + pwd + kids;
        }
      }
    }
    return totalGuests;
  }
  function getTotalAccommodation(reservations: any): number {
    let totalAccommodation = 0;
  
    for (const reservation of reservations) {
      // Check if reservation has invoices and invoices is an array with at least one element
      if (
        reservation?.invoices &&
        Array.isArray(reservation.invoices) &&
        reservation.invoices.length > 0
      ) {
        totalAccommodation += 1; // Increment by 1 for each reservation with at least one invoice
      }
    }
    return totalAccommodation;
  }
  
  
  // Filter Functions
  const sortBySchedule = (data: any): any => {
    return data.sort((a:any, b:any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
  };
  const sortByOldestSchedule = (data: any): any => {
    return data.sort((a:any, b:any) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime());
  };
  const filterByDateRange = (data: any, startDate: Date, endDate: Date): any => {
    const filteredData = data.filter((reservation:any) => {
      const reservationDate = new Date(reservation.schedule);
      return reservationDate >= startDate && reservationDate <= endDate;
    });
  
    return filteredData;
  };

  
  useEffect(()=>{
    getReservation();
  },[])
  useEffect(() => {
    // Filter and sort reservations based on the schedule
    if (reservations) {
      const filteredAndSorted = reservations
        .filter((reservation: any) => ['checkedOut', 'pending', 'cancelled', 'refunded'].includes(reservation.status))
        .sort((a: any, b: any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
  
      // Apply date range filtering
      if (dateFilterInput.start !== '' && dateFilterInput.end !== '') {
        const startDate = new Date(dateFilterInput.start);
        const endDate = new Date(dateFilterInput.end);
        const filteredData = filteredAndSorted.filter((reservation: any) => {
          const reservationDate = new Date(reservation.schedule);
          return reservationDate >= startDate && reservationDate <= endDate;
        });
        setReports(filteredData);
      } else {
        // If no date range is specified, set the reports directly
        setReports(filteredAndSorted);
      }
    }
  }, [reservations, dateFilterInput.start, dateFilterInput.end]);

  useEffect(() => {
    if (!reservations) {
      return; // Exit early if reservations is null
    }
    if (dateFilterInput.start !== '' && dateFilterInput.end !== '') {
      const startDate = new Date(dateFilterInput.start);
      const endDate = new Date(dateFilterInput.end);
  
      const filteredAndSorted = reservations
        .filter((reservation: any) => ['checkedOut', 'pending', 'cancelled', 'refunded'].includes(reservation.status))
        .sort((a: any, b: any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
  
      const filteredData = filterByDateRange(filteredAndSorted, startDate, endDate);
      setReports(filteredData);
    } else {
      // If no date range is specified, set the reports directly
      const filteredAndSorted = reservations
        .filter((reservation: any) => ['checkedOut', 'pending', 'cancelled', 'refunded'].includes(reservation.status))
        .sort((a: any, b: any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
      setReports(filteredAndSorted);
    }
  }, [reservations, dateFilterInput.start, dateFilterInput.end]);
  
  useEffect(() => {
    if (reports) {
      setReportCardValue((prevReportCardValue) => ({
        ...prevReportCardValue,
        TotalGuests: getTotalNumberOfGuests(reports),
        TotalAccommodation: getTotalAccommodation(reports),
      }));
    }
  }, [reports]);

  if(loadingReports) return <><div>Loading...</div></>
  return (
      <div>
          <Typography variant="h4" fontWeight={600} color="primary">Report</Typography>
          <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of reservation and reports</Typography>
          <Box display="flex" gap={"15px"}>
              <ReportCard variant='reservation' title="Total Number of Guests" value={reportCardValue.TotalGuests}/>
              <ReportCard variant='accommodation' title="Total Accommodation" value={reportCardValue.TotalAccommodation}/>
              <ReportCard variant='revenue' title="Total Sales" value={reportCardValue.TotalSales}/>
          </Box>
          <Box display="flex" m={"45px 0"} gap={"25px"} alignItems={"center"}>
              <Box display={"flex"} gap={"10px"} sx={{ flexGrow: "1" }}>
                <TextField
                  id="fromDate"
                  label=""
                  type="date"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    selectedDate.setDate(selectedDate.getDate() - 1); // Deduct one day

                    // Update state correctly
                    setDateFilterInput((prevState) => ({
                      ...prevState,
                      start: selectedDate.toISOString().split("T")[0], // Format to 'YYYY-MM-DD'
                    }));
                  }}
                />
                <TextField
                  id="toDate" 
                  label=""
                  type="date"
                  onChange={(e) => handleDateChange(e, "end")}
                />
              </Box>
              <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
              >
                <Button>Backup</Button>
                <Button>Restore</Button>
              </ButtonGroup>
          </Box>
          <TableContainer sx={{marginTop:"25px"}}>
              <Table aria-label="simple table">
                  <TableHead>
                      <TableRow>
                        {/* //todo */}
                          <TableCell sx={{display:"flex",alignItems:"center"}}>
                            Date
                            {dateFilterButton === "sortAToZ"?
                              <IconButton aria-label="" onClick={()=>{
                                  setDateFilterButton("sortZToA")
                                  setReports(sortByOldestSchedule(reports))
                                }}>
                                <ArrowUpwardIcon/>
                              </IconButton>
                            :""}
                            {dateFilterButton === "sortZToA"?
                              <IconButton aria-label="" onClick={()=>{
                                setDateFilterButton("sortAToZ")
                                setReports(sortBySchedule(reports))
                                }}>
                                <ArrowDownwardIcon/>
                              </IconButton>
                            :""}
                          </TableCell>
                          <TableCell >Reference No.</TableCell>
                          <TableCell >No. Accommodation</TableCell>
                          <TableCell >Check In </TableCell>
                          <TableCell >Check Out </TableCell>
                          <TableCell >Status </TableCell>
                          <TableCell >Amount</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody >
                    {reports?.map((reservation: any) => (
                        <TableRow key={reservation.reservationId} sx={{ background: "#D7D7D7" }}>
                          <TableCell>{dayjs(reservation?.schedule).format('MMMM D, YYYY')}</TableCell>
                          <TableCell>{`${reservation.reservationId.substring(0, 4)}...${reservation.reservationId.substring(reservation.reservationId.length - 4)}`}</TableCell>
                          <TableCell align='center'>{reservation?.invoices.length}</TableCell>
                          <TableCell>Oct 25, 2023 at 10 am</TableCell>
                          <TableCell>Oct 25, 2023 at 2 pm</TableCell>
                          <TableCell>
                            <Chip
                              label={reservation?.status}
                              color={reservation?.status === 'cancelled' ? "error" : (reservation?.status === "approved" ? "primary" : "info")}
                            />
                          </TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
  )
}

export default Report