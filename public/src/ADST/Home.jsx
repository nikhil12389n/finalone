import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

import "../DGST/Home.css"
import { useUser } from "../ContextProvider";
export default function Home(){

    useEffect(()=>{
        const ref=localStorage.getItem("refreshed");
        if(!ref){
          localStorage.setItem("refreshed",true);
          window.location.reload();
        }
      },[]);
    const navigate=useNavigate();

    function reqforsupply(){
        navigate("/ADST/RequestForSupplies");

    }
    function statusofsend(){
        navigate("/ADST/StatusOfSend");
    }
    function statusofreceived(){
        navigate("/ADST/StatusOfReceived");
    }
    function receivedreq(){
        navigate("/ADST/ReceivedReq");
    }
    function trackorder(){
        navigate("/ADST/Trackorder");
    }
    return (
        <>
          <Navbar/>
          <div className="container homedgst-cont">

             <button onClick={reqforsupply} className="btn btn-dark my-3 ">Request for supplies</button>
             

             <button onClick={statusofsend} className="btn btn-dark my-3">Status Of Send Request</button>
             <button onClick={receivedreq} className="btn btn-dark my-3">Received Requests</button>
             <button onClick={statusofreceived} className="btn btn-dark my-3">Status Of Received Requests</button>

             <button className="btn btn-dark my-3" onClick={trackorder}>TrackOrder</button>
            
          </div>
        </>
    );
}