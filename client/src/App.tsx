import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import Base from './Layouts/Base/Base';
import AppLayout from './Layouts/Base/App';

// Pages
import Default from './Pages/Default/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import LandingPage from './Pages/LandingPage';
import Booking from './Pages/Guests/Booking/Booking';
import Invoice from './Pages/Guests/Invoice'

import Dashboard from './Pages/Admin/Dashboard';
function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />


        <Route element={<Base />} >
          <Route path="/" element={<LandingPage/>} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/invoice" element={<Invoice variant={"view"}/>} />
        </Route>

        <Route element={<AppLayout />} >
          <Route path="/admin" element={<Dashboard/>} />
        </Route>
    </Routes>
  );
}

export default App;