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
import ListReservation from './Pages/Admin/Reservation/ListReservation';
import Requests from './Pages/Admin/Reservation/Requests';
import Accommodation from './Pages/Admin/Manage/Accommodation';
import Content from './Pages/Admin/Manage/Content';
import PaymentInstruction from './Pages/Admin/Manage/PaymentInstruction';
import Policy from './Pages/Admin/Manage/Policy';
import CreateResrvation from './Pages/Admin/Reservation/CreateResrvation';
import Report from './Pages/Admin/Report/Report';
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
          <Route path="/admin" element={<Dashboard/>}/>

          <Route path="/admin/reservation/list" element={<ListReservation/>}/>
          <Route path="/admin/reservation/create" element={<CreateResrvation/>}/>
          <Route path="/admin/reservation/requests" element={<Requests/>}/>
          <Route path="/admin/reservation/view" element={<Invoice variant={"manage"}/>}/>

          <Route path="/admin/manage/accommodations" element={<Accommodation/>}/>
          <Route path="/admin/manage/content" element={<Content/>}/>
          <Route path="/admin/manage/paymentInstruction" element={<PaymentInstruction/>}/>
          <Route path="/admin/manage/policy" element={<Policy/>}/>

          <Route path="/admin/report" element={<Report/>}/>
        </Route>
    </Routes>
  );
}

export default App;