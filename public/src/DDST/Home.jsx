import React, { useEffect }  from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate=useNavigate();
    useEffect(()=>{
        const ref=localStorage.getItem("refreshed");
        if(!ref){
          localStorage.setItem("refreshed",true);
          window.location.reload();
        }
      },[]);
    function statusofreceived(){
        navigate("/DIVISION/StatusOfReceived");
    }

    function receivedreq(){
        navigate('/DIVISION/ReceivedRequests');
    }
    function statusofsend(){
        navigate("/DDST/StatusOfSend");
    }
    function requestforsupplies(){
        navigate("/DDST/RequestForSupplies");
    }
    function pendingrequests(){
        navigate("/DDST/PendingRequestsSend")
    }
    function trackorder(){
        navigate("/DDST/Trackorder");
    }
    return (
        <>
        <Navbar/>
        <div className="container homedgst-cont">

<button  onClick={requestforsupplies} className="btn btn-dark my-3">Request for supplies</button>


<button onClick={statusofsend} className="btn btn-dark my-3">Status Of Send Request</button>
<button onClick={receivedreq} className="btn btn-dark my-3">Received Requests</button>
<button onClick={statusofreceived} className="btn btn-dark my-3">Status Of Received Requests</button>

 <button onClick={pendingrequests} className="btn btn-dark my-3">Pending Requests Send</button>

 <button onClick={trackorder} className="btn btn-dark">Track Order</button>
</div>
        </>
    );
}