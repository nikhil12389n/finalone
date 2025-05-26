import React from "react";
import Navbar from "../Navbar";

import Register from '../Pages/Register'
import { useContext } from "react";
import ConnectionContext from "../Connection/Connection"
export default function AddDivOrUnits(){
    const {account,contract}=useContext(ConnectionContext);
   
    
return (
    <>
    <Navbar/>
     <Register/>

    </>
)
}