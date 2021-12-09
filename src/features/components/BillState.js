// mostrar lista facturas con un boton para cambiar al siguiente estado de la factura
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBill, selectBillStatus, getbillAsync, updateStatusBillAsync
} from '../bill/billSlice';
import { Navigate } from 'react-router-dom';

export function BillState() {

    const bills = useSelector(selectBill);
    const billStatus = useSelector(selectBillStatus);
    const dispatch = useDispatch();

    useEffect(function () {

        
        handleGetBills();
    }, []);

    const handleGetBills = () => {
        dispatch(getbillAsync())
    }

    const handleUpdateStatusBill = (bill) => {
        let billObj = {...bill}; 
        billObj.Status = 1;
        dispatch(updateStatusBillAsync(billObj))
        console.log(billObj);
        handleGetBills();
    }

    return (
        <div>
            <div className="container col-5">
                {
                    bills.length === 0 ?
                        <ul className="list-group">
                            <li>
                                No hay facturas disponibles
                            </li>
                        </ul>
                        :
                        bills.map(function (bill, index) {
                            return (
                                <div key={index}>
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark d-flex mb-3">
                                            <span className="fw-bold"> {bill.id + ' - '}</span>
                                            <span className="fw-bold">{bill.customerName + ' - '}</span>
                                            <span className="fw-bold">{bill.Status == 0 ? " Por pagar" : " Pagado"}</span>
                                            {bill.Status == 0 ? 
                                            <button className="btn btn-success ms-auto" type="button" onClick={() =>handleUpdateStatusBill(bill)}> Pagar </button>
                                                : <button className="btn btn-success ms-auto" type="button" disabled> Pagar </button>
                                        }
                                            </li>
                                    </ul>
                                </div>);

                        })
                }
            </div>
        </div>

    );

}