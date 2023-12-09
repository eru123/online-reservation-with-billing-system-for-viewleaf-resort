import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import Base from './Layouts/Base/Base';
import AppLayout from './Layouts/Base/AppBase/App';

// Pages Public
import Default from './Pages/Default/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import LandingPage from './Pages/LandingPage';
import Booking from './Pages/Guests/Booking/Booking';
import Invoice from './Pages/Guests/Invoice'
import Payment from './Pages/Guests/Booking/Payment';

// Pages Private
import Dashboard from './Pages/Admin/Dashboard';
import ListReservation from './Pages/Admin/Reservation/ListReservation';
import Requests from './Pages/Admin/Reservation/Requests';
import Accommodation from './Pages/Admin/Manage/Accommodation';
import AddAccommodation from './Pages/Admin/Manage/AddAccommodation';
import EditAccommodation from './Pages/Admin/Manage/EditAccommodation';
import Content from './Pages/Admin/Manage/Content';
import InvoiceManage from './Pages/Admin/Invoice'
import PaymentInstruction from './Pages/Admin/Manage/PaymentInstruction';
import Policy from './Pages/Admin/Manage/Policy';
import CreateResrvation from './Pages/Admin/Reservation/CreateResrvation';
import Report from './Pages/Admin/Report/Report';
import Additional from './Pages/Admin/Reservation/Additional/Additional';
import Staff from './Pages/Admin/staff/ManageStaffs';
import Notifications from './Pages/Admin/Notifications/Notifications';
import Profile from './Pages/Admin/Profile/Profile';

// Test
import TestFAQ from './Test/TestFAQ';
import TestContent from './Test/TestContent';
import TestShift from './Test/TestShift';
import TestLogin from './Test/TestLogin';
import TestCreateStaff from './Test/TestCreateStaff';
import TestLogout from './Test/TestLogout';
import TestAccommodation from './Test/TestAccommodation';
import TestReservation from './Test/TestReservation';
import SendEmails from './Pages/_Test/sendEmail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ProtectedRoute } from './Hooks/useAuth';
import PolicyView from './Pages/Guests/Policy';

const theme = createTheme({
  palette: {
    primary: {
      main: '#70AE45',
    },
    secondary: {
      main: '#2F2E5A',
      dark: '#1C1B45',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path="/*" element={<Error/>} /> */}
          <Route path="/login" element={<Login/>} />

          <Route element={<Base />} >
            <Route path="/" element={<LandingPage/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/booking/:date/:shift" element={<Booking/>} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/reservation/:id" element={<Invoice />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path='/policy' element={<PolicyView/>}/>
          </Route>

          <Route element={<AppLayout />} >
            {/* <Route element={<ProtectedRoute allowedRoles={["admin", "staff"]}/>}> */}
              <Route path="/admin" element={<Dashboard/>}/>
              <Route path="/admin/reservation/list" element={<ListReservation/>}/>
              <Route path="/admin/reservation/create" element={<CreateResrvation/>}/>
              <Route path="/admin/reservation/add" element={<Additional/>}/>
              <Route path="/admin/reservation/requests" element={<Requests/>}/>
              <Route path="/admin/invoice/:id" element={<InvoiceManage/>}/>
              <Route path="/admin/report" element={<Report/>}/>
              <Route path="/admin/notifications" element={<Notifications/>}/>
              <Route path="/profile" element={<Profile/>} />
            {/* </Route> */}

            <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
              <Route path="/admin/manage/accommodations" element={<Accommodation/>}/>
              <Route path="/admin/manage/accommodation/add" element={<AddAccommodation/>}/>
              <Route path="/admin/manage/accommodation/edit/:id" element={<EditAccommodation/>}/>
              <Route path="/admin/manage/content" element={<Content/>}/>
              <Route path="/admin/manage/paymentInstruction" element={<PaymentInstruction/>}/>
              <Route path="/admin/manage/policy" element={<Policy/>}/>
              <Route path="/admin/staff" element={<Staff/>}/>
            </Route>
          </Route>

          <Route path="/testfaq" element={<TestFAQ/>} />
          <Route path="/testfaq" element={<TestFAQ/>} />
          <Route path="/testcontent" element={<TestContent/>} />
          <Route path="/testshift" element={<TestShift/>} />
          <Route path="/testlogin" element={<TestLogin/>} />
          <Route path="/testcreatestaff" element={<TestCreateStaff/>} />
          <Route path="/testlogout" element={<TestLogout/>} />
          <Route path="/testaccommodation" element={<TestAccommodation/>} />
          <Route path="/testreservation" element={<TestReservation/>} />
          
      </Routes>
    </ThemeProvider>
  );
}

export default App;