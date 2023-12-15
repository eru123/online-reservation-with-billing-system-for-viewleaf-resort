import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Hooks/useAuth';
import './Styles/main.scss';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<App/>}/>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

const body = ReactDOM.createRoot(document.body);

body.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
    <div id="fb-root"></div>
    <div id="fb-customer-chat" className="fb-customerchat"></div>
  </>
);

if (window.location.pathname === '/') {
  console.log("I AM ROOT");
  var chatbot = document.getElementById('fb-customer-chat');
  chatbot?.setAttribute("page_id", "191293380731152");
  chatbot?.setAttribute("attribution", "biz_inbox");

  (window as any).fbAsyncInit = function () {
    (window as any).FB?.init({
      xfbml: true,
      version: 'v18.0',
    });
  };

  (function (d, s, id) {
    const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement; // Type assertion
    const fjs = d.getElementsByTagName(s)[0];
    if (!fjs || !js) return;
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    fjs.parentNode?.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();