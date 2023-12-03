import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';

type Props = {
  data: any;
  setFilteredData: React.Dispatch<any>;
};

function SearchInputReservation({ data, setFilteredData }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
    const filteredData = data.filter((reservation: any) => {
      // Convert statuses to lowercase for case-insensitive matching
      const status = reservation.status.toLowerCase();
      const search = searchTerm.toLowerCase();

      // Check if reservation ID, customer name, or status includes the search term
      return (
        reservation.reservationId.includes(search) ||
        reservation.customer.name.toLowerCase().includes(search) ||
        status.includes(search)
      );
    });

    setFilteredData(filteredData);
    console.log("----------------------------------------------")
    console.log(filteredData)
  };

  useEffect(()=>{
    setFilteredData(data)
  },[])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', background: 'white', width: '300px', padding: '0 0 0 .5em', border: '1px solid #B5B5B5', borderRadius: '8px' }}>
      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <input
        placeholder='Search...'
        type='text'
        style={{ border: 'none', outline: 'none', height: '38px', width: '100%', marginRight: '5px' }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          if(e.target.value === ""){
            setFilteredData(data)
          } 
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </Box>
  );
}

export default SearchInputReservation;
