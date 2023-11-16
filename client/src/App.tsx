import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import Base from './Layouts/Base/Base';
import AppLayout from './Layouts/Base/App';

// Pages Public
import Default from './Pages/Default/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import LandingPage from './Pages/LandingPage';
import Booking from './Pages/Guests/Booking/Booking';
import Invoice from './Pages/Guests/Invoice'

// Pages Private
import Dashboard from './Pages/Admin/Dashboard';
import ListReservation from './Pages/Admin/Reservation/ListReservation';
import Requests from './Pages/Admin/Reservation/Requests';
import Accommodation from './Pages/Admin/Manage/Accommodation';
import Content from './Pages/Admin/Manage/Content';
import InvoiceManage from './Pages/Admin/Invoice'
import PaymentInstruction from './Pages/Admin/Manage/PaymentInstruction';
import Policy from './Pages/Admin/Manage/Policy';
import CreateResrvation from './Pages/Admin/Reservation/CreateResrvation';
import Report from './Pages/Admin/Report/Report';
import Additional from './Pages/Admin/Reservation/Additional/Additional';
import Staff from './Pages/Admin/staff/ManageStaffs';
import Notifications from './Pages/Admin/Notifications/Notifications';

// Test
import TestFAQ from './Test/TestFAQ';
import TestContent from './Test/TestContent';
import TestShift from './Test/TestShift';
import TestFee from './Test/TestFee';


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
          <Route path="/admin/reservation/add" element={<Additional/>}/>
          <Route path="/admin/reservation/requests" element={<Requests/>}/>
          <Route path="/admin/reservation/view" element={<InvoiceManage/>}/>

          <Route path="/admin/manage/accommodations" element={<Accommodation/>}/>
          <Route path="/admin/manage/content" element={<Content/>}/>
          <Route path="/admin/manage/paymentInstruction" element={<PaymentInstruction/>}/>
          <Route path="/admin/manage/policy" element={<Policy/>}/>

          <Route path="/admin/report" element={<Report/>}/>
          <Route path="/admin/staff" element={<Staff/>}/>
          <Route path="/admin/notifications" element={<Notifications/>}/>
        </Route>

        <Route path="/testfaq" element={<TestFAQ/>} />
        <Route path="/testcontent" element={<TestContent/>} />
        <Route path="/testshift" element={<TestShift/>} />
        <Route path="/testfee" element={<TestFee/>} />

    </Routes>
  );
}

export default App;