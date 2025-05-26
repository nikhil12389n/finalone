import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../Connection/Connection";
import Navbar from "../Navbar";
import { useUser } from "../ContextProvider";


export default function PendingRequestsSend() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata, setcontractdata] = useState([]);
    const rolename = useUser();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await contract.methods.getallhashes(rolename, 0).call();
                let findata = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = await contract.methods.getalladstsrole(rolename, data[i]).call();
                    findata.push(temp);
                }

                // Process the data and parse quantities
                findata = findata.map(item => {
                    const products = Object.values(item.products).join(", ");
                    const quantities = Object.values(item.quantities)
                        .map(qty => parseInt(qty, 10))  // Convert quantities to integers
                        .join(", ");

                    // Determine action button based on status
                    let action = null;
                    if (item.status === "declined by adsts") {
                        action = (
                            <button className="btn btn-success" onClick={() => handlesendtodgst(item)}>Send to DGST</button>
                        );
                    }

                    return {
                        ...item,
                        products,
                        quantities,
                        action,
                    };
                });

                setcontractdata(findata);
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    }, [contract, rolename]);

    const handlesendtodgst = async (data) => {
        

        try {
            await contract.methods.ddstsendtodgst( data.origin,data.hash, rolename, data.products, data.quantities, data.endtime).send({ from: account });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <h1 className="title">Pending Received Requests</h1>
            <table className="table tablereceived">
                <thead>
                    <tr>
                        <th>Req no</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Send to DGST</th>
                    </tr>
                </thead>
                <tbody>
                    {contractdata.map((item, index) => (
                        item.status=="declined by adsts" && <tr key={index}>
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
