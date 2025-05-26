import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import ConnectionContext from "../Connection/Connection";
import "./StatusOfReceived.css";
import { useUser } from "../ContextProvider";


export default function StatusOfReceived() {
  const user = useUser(); 
  const { contract } = useContext(ConnectionContext);
  const [contractData, setContractData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
     

      try {
        const data = await contract.methods.getallhashes(user, 1).call();

        let findata = [];
        for (let i = 0; i < data.length; i++) {
          let temp = await contract.methods.getallreceivedrole(user, data[i]).call();
          
          findata.push(temp);
        }
        
        const updatedData = [];
        for (let item of findata) {
          if (item.status !== "pending" && item.status !== "accepted") {
            try {
              let d = await contract.methods.check(item.from, item.hash).call();
              updatedData.push({
                ...item,
                status: d
                  ? "declined by all adsts under divisions"
                  : item.status,
              });
            } catch (err) {
              console.log(err);
              updatedData.push(item); 
            }
          } else {
            updatedData.push(item);
          }
        }
        updatedData.reverse();
        setContractData(updatedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [contract, user]); 

  return (
    <>
      <Navbar />
      <h1 className="title">Status Of Received</h1>
      <div className="container">
        <div className="card-container">
          {contractData.map((item, index) => (
            <div key={index} className="card my-4">
              <div className="card-header">
                <h4>Hash: {item.hash}</h4>
              </div>
              <div className="card-body">
                <p><strong>From:</strong> {item.from}</p>
                <p><strong>Origin:</strong> {item.origin}</p>
                <p><strong>Products:</strong> {Object.values(item.products).join(", ")}</p>
                <p><strong>Quantities:</strong> {Object.values(item.quantities).join(", ")}</p>
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
