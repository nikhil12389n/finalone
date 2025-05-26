import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../Connection/Connection";
import Navbar from "../Navbar";
import $ from "jquery";
import 'datatables.net';
import { useUser } from "../ContextProvider";

export default function ReceivedRequests() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata, setcontractdata] = useState([]);
    const rolename = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await contract.methods.getallhashes(rolename, 1).call();
                let findata = [];
                
                for (let i = 0; i < data.length; i++) {
                    let temp = await contract.methods.getallreceivedrole(rolename, data[i]).call();
                    findata.push(temp);
                }
                

                findata = findata.map(item => {
                    
                    const quantities = Object.values(item.quantities)
                        .map(qty => parseInt(qty, 10))
                        .join(", ");

                    
                    let action = null;
                    if (item.status === "pending") {
                        action = (
                            <button className="btn btn-success" onClick={() => handleSendToADSTS(item)}>
                                Send to ADSTS
                            </button>
                        );
                    } else if (item.status === "declined by adsts" && item.from !== "DGST") {
                        action = (
                            <button className="btn btn-success" onClick={() => handleSendToDGST(item)}>
                                Send to DGST
                            </button>
                        );
                        
                    }

                    return {
                        ...item,
                        quantities,  
                        action,      
                    };
                });

                findata.reverse();

                setcontractdata(findata);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [contract, rolename]);

   
    const handleSendToDGST = async (data) => {
        const products = data.products;
        const quantities = data.quantities;
       

        try {
            //string memory origin,string memory hash,string memory div,string[] memory p,uint[] memory q,string memory endtime) public {
            await contract.methods.ddstsendtodgst(data.origin, data.hash, rolename, products, quantities, data.endtime).send({ from: account });
            alert("Sent to DGST successfully!");
           
        } catch (err) {
            console.log(err);
        }
    };

    const handleSendToADSTS = async (data) => {
       

        const products = data.products;
        const quantities = data.quantities;

        try {
            console.log(data.from, rolename,data.origin, data.hash, products, quantities, data.endtime)
           //ddstsenttoadsts(string memory from,string memory div,string memory origin,string memory hash,string[] memory p,uint[] memory q,string memory endtime) public {
            await contract.methods.ddstsenttoadsts(data.from, rolename,data.origin, data.hash, products, quantities, data.endtime).send({ from: account });
            alert("Sent to ADSTS successfully!");
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <h1 className="title">Received Requests</h1>
            <table id="receiveddiv" className="table tablereceived">
                <thead>
                    <tr>
                        <th>Req no</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {contractdata &&  contractdata.map((item, index) => (
                        (item.action) && 
                        <tr key={index}>
                        <td>{item.hash}</td>
                        <td>{item.from}</td>
                        <td>{item.origin}</td>
                        <td>{item.products}</td>
                        <td>{item.quantities}</td>
                        <td>{item.endtime}</td>
                        <td>{item.action}</td> 
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
