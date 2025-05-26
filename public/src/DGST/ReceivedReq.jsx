import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import "./receivedreq.css";
import { useUser } from '../ContextProvider';

export default function ReceivedReq() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractData, setContractData] = useState([]);
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
                
                findata = await Promise.all(findata.map(async (item) => {
                    const quantities = Object.values(item.quantities)
                        .map(qty => parseInt(qty, 10))
                        .join(", ");

                    let action = null;

                    if (item.status !== "pending" && item.status !== "accepted") {
                        try {
                            let d = await contract.methods.check(item.from, item.hash).call();
                            if (d) {
                                action = (
                                    <button className="btn btn-success" onClick={() => handleAccept(item)}>Accept</button>
                                );
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    } else if (item.status !== "accepted") {
                        action = (
                            <button className="btn btn-dark" onClick={() => handleSendToDivisions(item)}>Send to divisions</button>
                        );
                    }

                    return {
                        ...item,
                        quantities,
                        action,
                    };
                }));

                findata.reverse();
                setContractData(findata);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [contract, account, rolename]);

    const handleAccept = async (data) => {
        try {
            await contract.methods.dgstaccept(data.hash, data.origin).send({ from: account });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSendToDivisions = async (data) => {
        try {
            await contract.methods.dgstsentodivisions(data.from, data.hash, data.origin, Object.values(data.products), Object.values(data.quantities), data.endtime).send({ from: account });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <h1 className="title">Received Requests</h1>
            <table className="table tablereceived">
                <thead>
                    <tr>
                        <th>Hash</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contractData.map((item, index) => (
                        (item.action) && (
                            <tr key={index}>
                                <td>{item.hash}</td>
                                <td>{item.from}</td>
                                <td>{item.origin}</td>
                                <td>{Object.values(item.products).join(", ")}</td>
                                <td>{item.quantities}</td>
                                <td>{item.endtime}</td>
                                <td>{item.action}</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </>
    );
}
