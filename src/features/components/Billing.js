import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBill, selectBillStatus, getBillAsync
} from '../bill/billSlice';
export function Product() {

    const bills = useSelector(selectBill);
    const status = useSelector(selectBillStatus);
    const dispatch = useDispatch();
    const jwt = "a";
    useEffect(function () {    
            dispatch(getBillAsync(jwt))
    }, []);
}