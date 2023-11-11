import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


import TurnedInIcon from '@mui/icons-material/TurnedIn';

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[], currentMonth: number }) {
  const { highlightedDays = [], day, outsideCurrentMonth, currentMonth, ...other } = props;
  const isCurrentMonth = day.month() === currentMonth;
  const isSelected = isCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <TurnedInIcon sx={{ fill: "#E24B5B" }} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function TESTCalendar() {
  // selected day
  const [value, setValue] = React.useState<Dayjs | null>();


  const [activeMonth, setActiveMonth] = useState();
  const [highlightedDays,setHighlightedDays] = useState([1, 23, 2, 15]); // Define your highlighted days



  const initialValue = dayjs('2023-11-02'); // Set your desired date here
  const currentMonth = initialValue.month();


  const handleMonthChange = (date: Dayjs) => {
    const year = date.year();
    const setActiveMonth = date.month();

    setHighlightedDays([2,3,4,5,6])
  };



return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            defaultValue={initialValue}
            onMonthChange={(value)=>{handleMonthChange(value)}}
            showDaysOutsideCurrentMonth 
            slots={{
            day: (dayProps) => <ServerDay {...dayProps} currentMonth={currentMonth} highlightedDays={highlightedDays} />
            }}

            value={value} onChange={(newValue) => {

            setValue(newValue);
            alert(newValue)
            }}
        />
        </LocalizationProvider>
    );
}

export default TESTCalendar