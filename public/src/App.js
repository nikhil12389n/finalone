// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './DGST/Home';
import Home1 from './ADST/Home';
import AddDivOrUnits from './DGST/AddDivOrUnits';
import RequestForSupplies from './ADST/RequestForSupplies';
import StatusOfSendAdst from './ADST/StatusOfsend';
import ReceivedReqDiv from './DDST/ReceivedRequests';
import StatusOfreceiveddiv from './DDST/StatusOfReceived';
import StatusOfReceivedAdst from './ADST/StatusOfReceived';
import ReceivedReqAdst from './ADST/ReceivedRequests';
import StatusOfReceivedDgst from './DGST/StatusOfReceived';
import ReceivedReqDgst from './DGST/ReceivedReq';
import StatusOfSendDdst from './DDST/StatusOfsend';
import Home2 from './DDST/Home';
import ReuestForSuppliesDdst from './DDST/RequestForsupplies';
import PendingRequestsSend from './DDST/PendingRequestsSend';
import Notfound from './Notfound';
import TrackOrder from './ADST/TrackOrder';
import { UserProvider, useUser } from './ContextProvider';
import { useCookies } from 'react-cookie';
import axios from 'axios';
function AppRoutes() {
  const user = useUser();
  useEffect(()=>{
    const ref=localStorage.getItem("refreshed");
    if(!ref){
      localStorage.setItem("refreshed",true);
      window.location.reload();
    }
  },[]);

  
  const [cookies]=useCookies([]);
  const navigate=useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (cookies.jwt) {
          const { data } = await axios.post('http://localhost:4000', {}, { withCredentials: true });
          if (data.status) {
            
          }
          else{
            navigate("/login");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    verifyUser();
  }, [cookies.jwt]);
  const pattern1 = new RegExp('^DIVISION\\d+$');
  const pattern2 = new RegExp('^D\\d+ADST\\d+$');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {user === "DGST" && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/DGST/AddDiviOrUni" element={<AddDivOrUnits />} />
          <Route path="/DGST/ReceivedReq" element={<ReceivedReqDgst />} />
          <Route path="/DGST/StatusOfReceived" element={<StatusOfReceivedDgst />} />
        </>
      )}
      {user && pattern1?.test(user) && (
        <>
          <Route path="/" element={<Home2 />} />
          <Route path="/DDST/StatusOfSend" element={<StatusOfSendDdst />} />
          <Route path="/DDST/RequestForSupplies" element={<ReuestForSuppliesDdst />} />
          <Route path="/DDST/PendingRequestsSend" element={<PendingRequestsSend />} />
          <Route path="/DIVISION/StatusOfReceived" element={<StatusOfreceiveddiv />} />
          <Route path="/DIVISION/ReceivedRequests" element={<ReceivedReqDiv />} />
          <Route path="/DDST/Trackorder" element={<TrackOrder/>}/>
        </>
      )}
      {user && pattern2?.test(user) && (
        <>
          <Route path="/" element={<Home1 />} />
          <Route path="/ADST/Trackorder" element={<TrackOrder />} />
          <Route path="/ADST/RequestForSupplies" element={<RequestForSupplies />} />
          <Route path="/ADST/StatusOfSend" element={<StatusOfSendAdst />} />
          <Route path="/ADST/StatusOfReceived" element={<StatusOfReceivedAdst />} />
          <Route path="/ADST/ReceivedReq" element={<ReceivedReqAdst />} />
        </>
      )}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}
