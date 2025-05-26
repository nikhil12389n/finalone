import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import ConnectionContext from "../Connection/Connection";
import $ from "jquery";
import 'datatables.net';
import { useUser } from "../ContextProvider";
export default function StatusOfSend() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractData, setContractData] = useState([]);
    const [dataTable, setDataTable] = useState(null);
    const rolename=useUser();
    useEffect(() => {
    
        const fetchData = async () => {
            try {
                let data = await contract.methods.getallhashes(rolename, 0).call();
                let findata = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = await contract.methods.getalladstsrole(rolename, data[i]).call();
                    findata.push(temp);
                }
                console.log(findata);
               
               let updatedData=[];
                for (let i = 0; i < findata.length; i++) {
                    updatedData.push({hash:findata[i].hash,products:Object.values(findata[i].products).join(", "),quantities:Object.values(findata[i].quantities).join(", "),endtime:findata[i].endtime,status:findata[i].status,from:findata[i].from,origin:findata[i].origin});
                    
                }
                console.log(updatedData);
                
                setContractData(updatedData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

        
        
    }, [contract, dataTable]);

    return (
        <>
            <Navbar />

            <h1 className="title">Status Of Send Requests</h1>
            <div className="container">
        <div className="card-container">
          {contractData && contractData.map((item, index) => (
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
