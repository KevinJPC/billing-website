import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProduct, selectStatus, getProductAsync
} from '../product/productSlice';
export function Product() {

    const products = useSelector(selectProduct);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();
    const jwt = "a";
    useEffect(function () {    
            dispatch(getProductAsync(jwt))
    }, []);

    return(
  <div>
      <p>Productos</p>
  </div>
  );
}
