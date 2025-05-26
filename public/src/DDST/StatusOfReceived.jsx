import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../Connection/Connection";
import Navbar from "../Navbar";
import $ from "jquery";
import 'datatables.net';
import { useUser } from "../ContextProvider";

export default function StatusOfReceived() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata, setcontractdata] = useState([]);

   const rolename=useUser();
    useEffect(() => {
       const table= $('#statusofreceiveddiv').DataTable();
        const fetchdata = async () => {
            try {
                const data = await contract.methods.getallhashes(rolename,1).call();

               let findata=[];
               for(let i=0;i<data.length;i++){
                let temp=await contract.methods.getallreceivedrole(rolename,data[i]).call();
                findata.push(temp);
               }
               let updatedData1=[];
               for(let i=0;i<findata.length;i++){
                updatedData1.push({hash:findata[i].hash,from:findata[i].from,origin:findata[i].origin,products:Object.values(findata[i].products).join(","),quantities:Object.values(findata[i].quantities).join(","),endtime:findata[i].endtime,status:findata[i].status});
               }
               updatedData1.reverse();
               
                setcontractdata(updatedData1);
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    }, [contract]); 


    useEffect(() => {
        
    }, [contractdata]); 

    return (
        <>
            <Navbar />
            <h1 className="title">Status Of Received</h1>
            <div className="container">
        <div className="card-container">
          {contractdata && contractdata.map((item, index) => (
            <div key={index} className="card my-4">
              <div className="card-header">
                <h4>Hash: {item.hash}</h4>
              </div>
              <div className="card-body">
                <p><strong>From:</strong> {item.from}</p>
                <p><strong>Origin:</strong> {item.origin}</p>
                <p><strong>Products:</strong> {item.products}</p>
                <p><strong>Quantities:</strong> {item.quantities}</p>
                <p><strong>End Date:</strong> {item.endtime}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
           
            
        </>
    );
}
