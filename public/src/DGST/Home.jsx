import React, { useEffect } from "react";
import Navbar from "../Navbar";
import "./Home.css"
import {  useNavigate } from "react-router-dom";
import { useUser } from "../ContextProvider";
export default function Home(){

  const navigate=useNavigate();
 useEffect(()=>{
    const ref=localStorage.getItem("refreshed");
    if(!ref){
      localStorage.setItem("refreshed",true);
      window.location.reload();
    }
  },[]);

  function AddDivisionsorUni(){
    navigate("/DGST/AddDiviOrUni");
  }
  function sendReq(){
    navigate("")
  }

  function receivedreq(){
    navigate("/DGST/ReceivedReq");
  }
  function statusofreceived(){
    navigate("/DGST/StatusOfReceived");
  }

    return (
        <>
          <Navbar/>

          <div className="container homedgst-cont">

             <button onClick={receivedreq} className="btn btn-dark my-3">Received Requests</button>
             <button onClick={statusofreceived} className="btn btn-dark  my-3">Status Of Received Requests</button>

             <button onClick={AddDivisionsorUni} className="btn btn-dark my-3">Add Divisions or Units</button>

          </div>
        </>
    )
}