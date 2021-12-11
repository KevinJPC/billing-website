// mostrar lista facturas con un boton para cambiar al siguiente estado de la factura
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBill, selectBillStatus, getbillAsync, updateStatusBillAsync
} from '../bill/billSlice';
import { Navigate } from 'react-router-dom';
import {
    selectUser, selectUserStatus, reLoginAsync, selectUserConnected
} from '../user/userSlice';

export function BillState() {

    const bills = useSelector(selectBill);
    const billStatus = useSelector(selectBillStatus);
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userConnected = useSelector(selectUserConnected);


    useEffect(function () {
        handleGetBills();

        if (userConnected === null && sessionStorage.getItem('jwt')) {
            dispatch(reLoginAsync());
        }

    }, []);

    const handleGetBills = () => {
        dispatch(getbillAsync())
    }

    const handleUpdateStatusBill = (bill) => {

        let billObj = { ...bill };
        billObj.Status = 1;
        dispatch(updateStatusBillAsync(billObj))
    }

    const handleGetDate = (dateStr) => {
        let dateObj = new Date(dateStr);
        let dateFormat = dateObj.toLocaleString()
        return dateFormat
    }

    return (
        <div>
            {userConnected === true ?
            <div className="container col-8">
                <table className="table table-hover table-fixed">
                    <thead>
                        <tr>
                            <th scope="col">Factura</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Cédula</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills.length === 0 ?
                                <tr>
                                    <td colSpan="5">
                                        <div className=" text-center alert alert-danger col" role="alert">
                                            No hay facturas disponibles
                                        </div>
                                    </td>
                                </tr>
                                :

                                bills.map(function (bill, index) {
                                    return (
                                        <tr key={index}>
                                            <th>
                                                <p className="fw-normal"> {bill.id}</p>
                                            </th>
                                            <th>
                                                <span className="fw-normal">{bill.customerName + ' ' + bill.customerLastName}</span>
                                            </th>
                                            <th>
                                                <span className="fw-normal">{bill.customerIdentification}</span>
                                            </th>
                                            <th>
                                                <span className="fw-normal">{ handleGetDate(bill.created_at) }
                                                    </span>
                                            </th>
                                            <th>
                                                {bill.Status == 0 ? <span className="fw-normal text-danger">Por pagar</span> : <span className="fw-normal text-success">Pagado</span>}
                                            </th>
                                            <th>
                                                {bill.Status == 0 ?
                                                    <button className="btn btn-danger ms-auto" type="button" onClick={() => handleUpdateStatusBill(bill)}> Pagar </button>
                                                    : null
                                                }
                                            </th>
                                        </tr>);

                                })
                        }
                    </tbody>
                </table>
            </div>
            :
            <Navigate to="/" />

    }
        </div >

    );

}