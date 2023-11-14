import React from 'react'
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
function Report() {
    return (
        <div>
            <Typography variant="h4" fontWeight={600} color="primary">Report</Typography>
            <Typography variant="h6" fontWeight={400} color="initial" sx={{marginBottom:"2em"}}>List of reservation and reports</Typography>
            <Box display="flex" gap={"15px"}>
                <ReportCard variant='reservation' title="Total Number of Guests" value={300}/>
                <ReportCard variant='accommodation' title="Total Accommodation" value={300}/>
                <ReportCard variant='revenue' title="Total Sales" value={300}/>
            </Box>
            <Box display="flex" m={"45px 0"} gap={"25px"} alignItems={"center"}>
                <Box display={"flex"} gap={"10px"} sx={{flexGrow:"1"}}>
                    <TextField
                        id="fromDate"
                        label=""
                        type='date'
                    />
                    <TextField
                        id="fromDate"
                        label=""
                        type='date'
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
                            <TableCell sx={{display:"flex",alignItems:"center"}}>
                                Date
                                <IconButton aria-label="" onClick={()=>{}}>
                                    <SwapVertIcon/>
                                </IconButton>
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
                        <TableRow sx={{background:"#D7D7D7"}}>
                            <TableCell >Oct 25, 2023</TableCell>
                            <TableCell >#2W23e23</TableCell>
                            <TableCell >2</TableCell>
                            <TableCell >Oct 25, 2023 at 10 am</TableCell>
                            <TableCell >Oct 25, 2023 at 2 pm</TableCell>
                            <TableCell ><Chip label="Approved" color="primary" /></TableCell>
                            <TableCell >Amount</TableCell>
                        </TableRow>
                        <TableRow sx={{background:"#D7D7D7"}}>
                            <TableCell >Oct 25, 2023</TableCell>
                            <TableCell >#2W23e23</TableCell>
                            <TableCell >2</TableCell>
                            <TableCell >Oct 25, 2023 at 10 am</TableCell>
                            <TableCell >Oct 25, 2023 at 2 pm</TableCell>
                            <TableCell ><Chip label="Approved" color="primary" /></TableCell>
                            <TableCell >Amount</TableCell>
                        </TableRow>
                        <TableRow sx={{background:"#D7D7D7"}}>
                            <TableCell >Oct 25, 2023</TableCell>
                            <TableCell >#2W23e23</TableCell>
                            <TableCell >2</TableCell>
                            <TableCell >Oct 25, 2023 at 10 am</TableCell>
                            <TableCell >Oct 25, 2023 at 2 pm</TableCell>
                            <TableCell ><Chip label="Approved" color="primary" /></TableCell>
                            <TableCell >Amount</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Report