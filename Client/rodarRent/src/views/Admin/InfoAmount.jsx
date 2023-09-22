import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const InfoAmount = () => {
  const [income, setIncome] = React.useState('');
  const [ytdIncome, setYtdIncome] = React.useState(null);
  const [mtdIncome, setMtdIncome] = React.useState(null);
  const [todayIncome, setTodayIncome] = React.useState(null);

  const handleChange = (event) => {
    setIncome(event.target.value);
  };

  const calculateIncomes = (bookings) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Los meses son base 0

    const ytd = bookings.reduce((total, booking) => {
      const bookingYear = new Date(booking.startDate).getFullYear();
      if (bookingYear === currentYear) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    const mtd = bookings.reduce((total, booking) => {
      const bookingYear = new Date(booking.startDate).getFullYear();
      const bookingMonth = new Date(booking.startDate).getMonth() + 1; // Meses base 0
      if (bookingYear === currentYear && bookingMonth === currentMonth) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    const today = bookings.reduce((total, booking) => {
      const bookingDate = new Date(booking.startDate);
      const bookingYear = bookingDate.getFullYear();
      const bookingMonth = bookingDate.getMonth() + 1; // Meses base 0
      const bookingDay = bookingDate.getDate();
      if (
        bookingYear === currentYear &&
        bookingMonth === currentMonth &&
        bookingDay === currentDate.getDate()
      ) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    setYtdIncome(ytd);
    setMtdIncome(mtd);
    setTodayIncome(today);
  };

  function fetchBookings() {
    return fetch("http://localhost:3001/booking/filter")
      .then((res) => res.json())
      .then((data) => {
        calculateIncomes(data);
        return data;
      });
  }

  const queryBookings = useQuery(["bookings"], fetchBookings);

  return (
    <div className="ml-8 w-4/5 rounded-2xl border-2 max-h-full">
          <div className="text-center text-2xl font-semibold pt-4">Select earnings</div>

      <div className="flex w-full justify-around pt-10">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Income</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={income}
              label="Income"
              onChange={handleChange}
            >
              <MenuItem value="ytd">YTD</MenuItem>
              <MenuItem value="mtd">MTD</MenuItem>
              <MenuItem value="today">Today</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="text-center mt-10">
        {income === "ytd" && ytdIncome !== null ? (
          <div className="text-5xl">${ytdIncome}</div>
        ) : income === "mtd" && mtdIncome !== null ? (
          <div className="text-5xl">${mtdIncome}</div>
        ) : income === "today" && todayIncome !== null ? (
          <div className="text-5xl">${todayIncome}</div>
        ) : (
          <Loader />
        )}
        <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
      </div>
      </div>

  );
  
}
