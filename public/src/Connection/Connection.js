import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import ABI from "./ABI";
import address from "./Address";

const ConnectionContext = createContext();

export function ConnectionProvider({ children }) {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    useEffect(() => {
        async function connectMetaMask() {
            if (window.ethereum !== undefined) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const selectedAccount = accounts[0];
                    console.log(selectedAccount);
                    
                    setAccount(selectedAccount);
                } catch (err) {
                    console.log("Error in connecting MetaMask!", err);
                }
            }
        }

        async function connectContract() {
            window.web3 = new Web3(window.ethereum);
            const contract = new window.web3.eth.Contract(ABI, address);
            setContract(contract);
        }

        connectMetaMask();
        connectContract();
    }, []);

    return (
        <ConnectionContext.Provider value={{ account, contract }}>
            {children}
        </ConnectionContext.Provider>
    );
}

export default ConnectionContext;
