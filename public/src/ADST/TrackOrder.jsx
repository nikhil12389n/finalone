import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import ConnectionContext from '../Connection/Connection';
import { useUser } from '../ContextProvider';
import "./trackorder.css";
import Navbar from '../Navbar';

export default function TrackOrder() {
    const rolename = useUser();
    const { account, contract } = useContext(ConnectionContext);
    
    const [trackOrders, setTrackOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all hashes
                const data = await contract.methods.getallhashes(rolename, 0).call();
                let orders = [];
                
                for (let i = 0; i < data.length; i++) {
                    const ref = await contract.methods.getalladstsrole(rolename, data[i]).call();
                    const trackData = {
                        hash: ref.hash,
                        from: ref.from,
                        origin: ref.origin,
                        endtime: ref.endtime,
                        products: ref.products.join(", "),
                        quantities: ref.quantities.join(", "),
                        checkpoints: []
                    };

                    let trackOrderData = await contract.methods.gettrackorder(rolename, ref.hash).call();
                    trackData.checkpoints = trackOrderData;
                    orders.push(trackData);
                }

                for(let i=0;i<orders.length;i++){
                    let dup=orders[i].checkpoints;
                    let dup2=[];
                   console.log(dup);
                   for(let j=0;j<dup.length;j++){
                     if(dup[j].split(" ")[0]=="accepted"){
                        dup2.push(dup[j]);
                        break;
                     }
                     dup2.push(dup[j]);
                   }
                   let dup3=[];
                   for(let j=0;j<dup2.length;j++){
                    if(j==0){
                        dup3.push(dup2[j]);
                    }
                    else{
                        if(dup3[dup3.length-1]!=dup2[j]){
                            dup3.push(dup2[j]);
                        }
                    }
                   }
                   orders[i].checkpoints=dup3;
                    
                }
                setTrackOrders(orders);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [contract, rolename]);

    const getCheckpointClass = (index, total) => {
        if (index === 0) return 'start'; // First checkpoint
        if (index === total - 1) return 'end'; // Last checkpoint
        return 'middle'; // All others
    };

    return (
        <>
            <Navbar />
            <div className="container track">
                <h1>Track Orders</h1>
                <div className="order-list">
                    {trackOrders.map((order, index) => (
                        <div key={index} className="order-card">
                            <h3>Hash: {order.hash}</h3>
                            <p><strong>Products:</strong> {order.products}</p>
                            <p><strong>Quantities:</strong> {order.quantities}</p>
                            <p><strong>End Date:</strong> {order.endtime}</p>
                            <h4>Checkpoints:</h4>
                            <div className="checkpoints-container">
                                {order.checkpoints.map((checkpoint, idx) => (
                                    <div key={idx} className="checkpoints-item-container">
                                        <div
                                            className={`checkpoints-item ${getCheckpointClass(idx, order.checkpoints.length)}`}
                                        />
                                        <div className="checkpoints-text">{checkpoint}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
