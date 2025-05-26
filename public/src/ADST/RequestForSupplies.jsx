import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import $ from "jquery";
import 'datatables.net';
import ConnectContext from "../Connection/Connection";
import "./Requestforsupplies.css"; 
import { nanoid } from "nanoid";
import { useUser } from "../ContextProvider";

export default function RequestForSupplies() {
    const { account, contract } = useContext(ConnectContext);
    const [formData, setFormData] = useState({
        product: "",
        quantity: "",
    });
    const [endTime, setEndTime] = useState("");
    const [modelOpen, setModelOpen] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    // Move the useUser hook call here
    const adstname = useUser();

    const finalSubmit = async (e) => {
        e.preventDefault();

        const data = $('#supplytable').DataTable().rows().data().toArray();

        let products = [];
        let quantities = [];
        for (let i = 0; i < data.length; i++) {
            products.push(data[i][0]);
            quantities.push(parseInt(data[i][1]));
        }

        let divno = 0;
        for (let i = 1; i < adstname.length; i++) {
            if (parseInt(adstname[i], 10)) {
                divno = divno * 10 + parseInt(adstname[i], 10);
            } else {
                break;
            }
        }
        let divname = "DIVISION" + String(divno);

        try {
            await contract.methods.adstsend(nanoid(), adstname, divname, products, quantities, endTime).send({ from: account });

            alert("Request Sent Successfully!");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const table = $('#supplytable').DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
        });

        table.on('draw', function () {
            setRowCount(table.rows().count());
        });

        return () => {
            table.destroy();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        $('#supplytable').DataTable().row.add([
            formData.product,
            formData.quantity,
        ]).draw();

        setFormData({
            product: "",
            quantity: "",
        });
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <h1 className="title">Request For Supplies</h1>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group my-2">
                        <label htmlFor="dropdownprod"><b>Products</b></label>
                        <select
                            id="dropdownprod"
                            name="product"
                            value={formData.product}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        >
                            <option value="">Select a product</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Rice">Rice</option>
                            <option value="Meals">Meals</option>
                            <option value="Dal">Dal</option>
                        </select>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="quantity"><b>Quantities</b></label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">Add another product</button>
                </form>

                <div className="table-container">
                    <table id="supplytable" className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                {rowCount > 0 && (
                    <button className="btn btn-primary my-3" onClick={() => setModelOpen(true)}>Submit</button>
                )}

                {modelOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Enter End Time</h2>
                            <input
                                type="datetime-local"
                                name="endtime"
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                            <div className="modal-buttons">
                                <button
                                    className="btn btn-primary"
                                    onClick={finalSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setModelOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
