import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProduct, selectProductStatus, getProductsAsync, getProductsByQueryAsync
} from '../product/productSlice';
import {
    selectUser, selectUserStatus, selectUserError, selectUserConnected, loginAsync, reLoginAsync
} from '../user/userSlice';
import { Navigate } from 'react-router-dom';

export function Product() {

    const products = useSelector(selectProduct);
    const productStatus = useSelector(selectProductStatus);

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userConnected = useSelector(selectUserConnected);

    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [query, setQuery] = useState('');

    const [availability, setAvailability] = useState(-1);

    const [validationMessage, setValidationMessage] = useState('');

    useEffect(function () {

        if (query === '') {
            handleGetProducts();
        } else {
            handleGetProductsByQuery(query);
        }
        
        if (userConnected === null && sessionStorage.getItem('jwt')) {
            dispatch(reLoginAsync());
        }

    }, [query]);

    const handleGetProducts = () => {
        dispatch(getProductsAsync())
    }

    const handleGetProductsByQuery = (query) => {
        dispatch(getProductsByQueryAsync(query))
    }

    const handleCheckAvailability = () => {
        if (id === '' || amount === '') {
            setValidationMessage('Debe seleccionar un producto y digitar la cantidad solicitada')
        } else {
            let availabilityRandom = Math.floor(Math.random() * (2 - 0) + 0);
            setAvailability(availabilityRandom)
            setValidationMessage('')
        }
    }

    const handleClean = () => {
        setId('')
        setAmount('')
        setAvailability(-1)
        setValidationMessage('')
    }

    return (

        <div>
            {userConnected === true ?

                    <div>
                        <h2 className='text-center pb-4'>Consultar producto</h2>

                        <div className='container d-flex justify-content-center'>
                            <div className='col-7'>

                                <div>
                                    <input className='form-control' style={{ width: "100%" }} type="text" onChange={e => {
                                        let pattern = new RegExp("^[a-zA-Z0-9_]*$");
                                        if(pattern.test(e.target.value)){
                                            setQuery(e.target.value)
                                        }else{
                                            e.target.value = query;
                                        }
                                        }
                                        
                                        } placeholder='Busque y seleccione un producto' />
                                </div>

                                <div className='overflow-auto' style={{ height: "172px" }}>
                                    {
                                        products.length === 0 ?
                                            <div className=" text-center alert alert-danger col" role="alert">
                                                Sin resultados de busqueda
                                            </div>
                                            :
                                            products.map(function (product, index) {
                                                return (
                                                    <div className={'p-2 border-bottom product-item-list ' + (id == product.id ? 'product-item-list-select' : null)} key={index} onClick={() => setId(product.id)}>
                                                        <p>
                                                            <span className="fw-bold"> {product.id + ' - '} </span>
                                                            <span className="fw-bold"></span> {product.name + ': '}
                                                            <span className="fw-bold"></span> {product.description}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                    }
                                </div>

                                <div className='d-flex pt-5 pb-4'>
                                    <div className="me-5">
                                        <label className="form-label me-3">Código</label>
                                        <input type="number" className="form-control" onChange={e => setId(e.target.value)} value={id} disabled />
                                    </div>

                                    <div className="">
                                        <label className="form-label me-3">Cantidad</label>
                                        <input type="number" className="form-control" onChange={e => setAmount(e.target.value)} value={amount} />
                                    </div>
                                </div>

                                <div className='d-flex alert alert-secondary' role='alert'>
                                    {'Estado: '}
                                    {availability === -1 ? null :
                                        <div> {availability === 0 ?
                                            <span className='text-danger ms-1'>No disponible</span>
                                            :
                                            <span className='text-success ms-1'>Disponible</span>
                                        } </div>
                                    }
                                </div>

                                <button type='button' className="btn btn-success me-2" onClick={() => handleCheckAvailability()}>Consultar</button>
                                <button type='button' className="btn btn-primary" onClick={() => handleClean()}>Limpiar</button>

                                <div className='text-danger mt-3'>
                                    {validationMessage === '' ? null : validationMessage}
                                </div>
                            </div>

                        </div>

                    </div>

                    :

                    <Navigate to="/" />

            }
        </div>


    );
}
