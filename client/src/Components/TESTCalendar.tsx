import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps, DateCalendar } from '@mui/x-date-pickers';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

interface HighlightedDaysMap {
  [key: string]: number[]; // Key is a combination of month and year, e.g., "January-2022"
}

function AppointmentDay(props: PickersDayProps<Dayjs> & { highlightedDaysMap?: HighlightedDaysMap }) {
  const { highlightedDaysMap = {}, day, ...other } = props;
  const monthYearKey = day.format('MMMM-YYYY');

  const highlightedDays = highlightedDaysMap[monthYearKey] || [];
  const isSelected = highlightedDays.includes(day.date());

  return (
    <Badge overlap="circular" badgeContent={isSelected ? <TurnedInIcon sx={{ fill: '#E24B5B' }} /> : undefined}>
      <PickersDay key={day.toString()} {...other} day={day} />
    </Badge>
  );
}

type Props = {
  appointments?: any[];
  setSelectedDay?: React.Dispatch<React.SetStateAction<Dayjs | null | undefined>>;
  selectedDay?: Dayjs | null;
};

function TESTCalendar({ appointments, setSelectedDay, selectedDay }: Props) {
  // selected day
  const [highlightedDaysMap, setHighlightedDaysMap] = useState<HighlightedDaysMap>({});
  const initialValue = dayjs();

  const schedules = appointments?.map((item) => item.schedule) || [];

  const formatDateToMonthYear = (date: string) => {
    return dayjs(date).format('MMMM-YYYY');
  };

  const formatSchedulesToHighlightedDaysMap = (schedules: string[]) => {
    const highlightedDaysMap: HighlightedDaysMap = {};

    schedules.forEach((schedule) => {
      const key = formatDateToMonthYear(schedule);
      if (!highlightedDaysMap[key]) {
        highlightedDaysMap[key] = [];
      }

      const dayOfMonth = dayjs(schedule).date();
      highlightedDaysMap[key].push(dayOfMonth);
    });

    return highlightedDaysMap;
  };

  useEffect(() => {
    setHighlightedDaysMap(formatSchedulesToHighlightedDaysMap(schedules));
  }, [schedules]);

  const handleMonthChange = (date: Dayjs) => {
    const monthYearKey = date.format('MMMM-YYYY');

    if (!highlightedDaysMap[monthYearKey]) {
      setHighlightedDaysMap((prevMap) => ({
        ...prevMap,
        [monthYearKey]: [],
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onMonthChange={(value) => {
          handleMonthChange(value);
        }}
        slots={{
          day: (dayProps) => <AppointmentDay {...dayProps} highlightedDaysMap={highlightedDaysMap} />,
        }}
        value={selectedDay || initialValue}
        onChange={(newValue) => {
          setSelectedDay?.(newValue); // Optional chaining here
        }}
      />
    </LocalizationProvider>
  );
}

export default TESTCalendar;
