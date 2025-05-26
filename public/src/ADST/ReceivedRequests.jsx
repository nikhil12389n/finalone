import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import { useUser } from '../ContextProvider';

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
                console.log(findata);

                findata = findata.map(item => {
                    let action = null;
                    // Convert quantities to integer array, then join as a comma-separated string
                    const quantities = item.quantities
                        ? Object.values(item.quantities)
                            .map(qty => {
                                const num = parseInt(qty, 10);
                                return isNaN(num) ? 'N/A' : num;
                            })
                            .join(", ")
                        : 'N/A';

                    if (item.status === "pending") {
                        return {
                            ...item,
                            acceptAction: <button className='btn btn-success' onClick={() => handleaccept(item)}>Accept</button>,
                            declineAction: <button className='btn btn-danger' onClick={() => handleDecline(item)}>Decline</button>,
                            quantities
                        };
                    } else {
                        return {
                            ...item,
                            quantities,
                            acceptAction: null,
                            declineAction: null
                        };
                    }
                });
                findata.reverse();
                setcontractdata(findata);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [contract, account, rolename]);

    const handleaccept = async (data) => {
        let status = "accepted by " + rolename;
        let pattern1 = new RegExp('^D\\d+ADST\\d+$');

        console.log(data);
        try {
            if (pattern1.test(data[2])) {
                await contract.methods.adstaccept(
                    rolename,
                    data.hash,
                    data.origin,
                    data.from,
                    false,
                    status
                ).send({ from: account });
            } else {
                await contract.methods.adstaccept(
                    rolename,
                    data.hash,
                    data.origin,
                    data.from,
                    true,
                    status
                ).send({ from: account });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDecline = async (data) => {
        try {
            await contract.methods.adstdecline(data.hash, data.origin, rolename, data.from).send({ from: account });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <h1 className='title'>Received Requests</h1>
            <table id="statusofreceivedadst" className="table tablereceived">
                <thead>
                    <tr>
                        <th>Hash</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Accept</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {contractdata.filter(item => item.status === "pending").map((item, index) => (
                        <tr key={index}>
                            <td>{item.hash}</td>
                            <td>{item.from}</td>
                            <td>{item.origin}</td>
                            <td>{item.products}</td>
                            <td>{item.quantities}</td>
                            <td>{item.endtime}</td>
                            <td>{item.acceptAction}</td> 
                            <td>{item.declineAction}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
