import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import $ from "jquery";
import { useUser } from '../ContextProvider';

export default function StatusOfReceived () {
    const { contract } = useContext(ConnectionContext);
  const [contractdata, setcontractdata] = useState([]);
  const rolename = useUser();

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        
        const data = await contract.methods
          .getallhashes(rolename, 1)
          .call();

        let findata = [];
        for (let i = 0; i < data.length; i++) {
          let temp = await contract.methods
            .getallreceivedrole(rolename, data[i])
            .call();
          findata.push(temp);
        }

        console.log(findata);
        const cards = findata.map(async (item) => {
         
            try {
              let d = await contract.methods.check(item.from, item.hash).call();
              return {
                ...item
              };
            } catch (err) {
              console.log(err);
            }
        
        });

        const resolvedCards = await Promise.all(cards);
        resolvedCards.reverse();
        setcontractdata(resolvedCards);
      } catch (err) {
        console.log(err);
      }
    };

    Fetchdata();
  }, [contract]);

    return (
        <>

        <Navbar/>
        <h1 className='title'>Status Of Received</h1>
      <div className="container">
        
        <div className="card-container">
          {contractdata.map((item, index) => (
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


