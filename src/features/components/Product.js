import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProduct, selectProductStatus, getProductsAsync, getProductsByQueryAsync
} from '../product/productSlice';
export function Product() {

    const products = useSelector(selectProduct);
    const productStatus = useSelector(selectProductStatus);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    useEffect(function () {    

        console.log("query", query)
        if(query === ''){
            handleGetProducts();
        }else{
            handleGetProductsByQuery(query);
        }

    }, [query]);

    const handleGetProducts = () => {
        dispatch(getProductsAsync())
    }

    const handleGetProductsByQuery = (query) => {
        dispatch(getProductsByQueryAsync(query))
    }

    return(
  <div>
      <p>Productos</p>
      
    {/* <input type="text"/> */}
    <input type="text" onChange={e => setQuery(e.target.value)}/>
  </div>
  );
}
