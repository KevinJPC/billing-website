import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBill, selectBillStatus, getBillAsync, registerBillAsync, setValues, selectBillRegistered
} from '../bill/billSlice';
import {
    selectProduct, selectProductStatus, getProductsAsync, getProductsByQueryAsync
} from '../product/productSlice';
import { getPaymentMethodAsync, selectPaymentMethod, selectPaymentMethodStatus }
    from '../paymentMethod/paymethodSlice';
import { selectUser, reLoginAsync, selectUserConnected } from '../user/userSlice';
import { Spinner } from './Spinner';
import { Navigate } from 'react-router-dom';



export function Billing() {

    //References
    const refCustomerName = useRef();
    const refCustomerLastName = useRef();
    const refPaymentMethod = useRef();
    const refCustomerIdentification = useRef();
    const refCustomerCreditCard = useRef();
    const refCustomerPhone = useRef();
    const refCustomerProduct = useRef();
    const refCustomerCountry = useRef();
    const refCustomerAddress = useRef();
    const refCustomerPostalCode = useRef();


    //Selectors
    const user = useSelector(selectUser);
    const paymentMethods = useSelector(selectPaymentMethod);
    const paymentMethodStatus = useSelector(selectPaymentMethodStatus);
    const bills = useSelector(selectBill);
    const status = useSelector(selectBillStatus);
    const products = useSelector(selectProduct);
    const productStatus = useSelector(selectProductStatus);

    const userConnected = useSelector(selectUserConnected);
    const billRegistered = useSelector(selectBillRegistered);

    //Dispatch
    const dispatch = useDispatch();

    //States
    const [customerName, setCustomerName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [customerIdentification, setCustomerIdentification] = useState('');
    const [customerCreditCard, setCustomerCreditCard] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerProduct, setCustomerProduct] = useState([]);
    const [Status, setStatus] = useState('0');
    const [customerCountry, setCustomerCountry] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPostalCode, setCustomerPostalCode] = useState('');

    const [query, setQuery] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [validationMessage2, setValidationMessage2] = useState('');
    const [validationMessage3, setValidationMessage3] = useState('');
    const [validationMessage4, setValidationMessage4] = useState('');
    const [validationMessage5, setValidationMessage5] = useState('');


    useEffect(function () {

        if (query === '') {
            handleGetProducts();
        } else {
            handleGetProductsByQuery(query);
        }

        dispatch(getPaymentMethodAsync());

        if (userConnected === null && sessionStorage.getItem('jwt')) {
            dispatch(reLoginAsync());
        }

        if (billRegistered == true) {
            dispatch(setValues());
            setCustomerName('');
            setCustomerLastName('');
            setCustomerIdentification('');
            setCustomerCreditCard('');
            setPaymentMethod('');
            setCustomerPhone('');
            setCustomerProduct([]);
            setStatus('0');
            setCustomerCountry('');
            setCustomerAddress('');
            setCustomerPostalCode('');
            setQuery('');
            cleanInputs();

        }


    }, [query, billRegistered]);

    const handleGetProducts = () => {
        dispatch(getProductsAsync())
    }

    const handleGetProductsByQuery = (query) => {
        dispatch(getProductsByQueryAsync(query))
    }
    const handleAddProduct = (id, price, name) => {

        for (let i = 0; i < customerProduct.length; i++) {

            if (customerProduct[i].id === id) {
                return false;
            }

        }
        let customerProductArray = customerProduct.slice();
        customerProductArray.push({ id, price, name, "amount": 0 });
        setCustomerProduct(customerProductArray);
    }

    const handleMinusProduct = id => {
        let customerProductArray = customerProduct.slice();

        for (let i = 0; i < customerProductArray.length; i++) {
            if (customerProductArray[i].id === id) {
                customerProductArray.splice(i, 1);
            }
        }
        setCustomerProduct(customerProductArray);

    }

    const handleAddProductAmount = (amount, id) => {
        let customerProductArray = customerProduct.slice();

        for (let i = 0; i < customerProductArray.length; i++) {
            if (customerProductArray[i].id === id) {
                customerProductArray[i].amount = amount;
            }
        }

        setCustomerProduct(customerProductArray);
    }

    const handleBilling = (bill) => {

        if (customerName === '' || customerLastName === '' || customerIdentification === '' || customerCreditCard === '' || customerPhone === '' || customerCountry === '' ||
            customerAddress === '' || customerPostalCode === '') {
            setValidationMessage('Debe llenar todos los campos')
            setTimeout(() => { setValidationMessage('') }, 5000);
        } else if (customerProduct.length == 0) {
            setValidationMessage('Debe agregar un producto')
            setTimeout(() => { setValidationMessage('') }, 5000);
        } else {

            let customerProductArray = customerProduct.slice();

            for (let i = 0; i < customerProductArray.length; i++) {
                if (customerProductArray[i].amount == null) {
                    setValidationMessage('Debe agregar la cantidad de cada producto')
                    setTimeout(() => { setValidationMessage('') }, 5000);
                } else {
                    dispatch(registerBillAsync(
                        bill
                    ))
                }
            }

        }

    }

    const cleanInputs = () => {
        refCustomerName.current.value = "";
        refCustomerLastName.current.value = "";
        refPaymentMethod.current.value = paymentMethods[0].id;
        refCustomerCreditCard.current.value = "";
        refCustomerPhone.current.value = "";
        refCustomerCountry.current.value = "";
        refCustomerAddress.current.value = "";
        refCustomerPostalCode.current.value = "";
        refCustomerIdentification.current.value = "";
    }

    const justNumberTel = (e) => {
        if (!Number(e) && e !== '') {
            setValidationMessage2('Número de teléfono inválido')
            setTimeout(() => { setValidationMessage2('') }, 5000);
        }
    }

    const justNumberPostal = (e) => {
        if (!Number(e) && e !== '') {
            setValidationMessage3('Código postal inválido')
            setTimeout(() => { setValidationMessage3('') }, 5000);
        }
    }

    const justNumberID = (e) => {
        if (!Number(e) && e !== '') {
            setValidationMessage4('Cédula inválido')
            setTimeout(() => { setValidationMessage4('') }, 5000);
        }
    }

    const justNumberCreditCard = (e) => {
        if (!Number(e) && e !== '') {
            setValidationMessage5('Número de tarjeta inválido')
            setTimeout(() => { setValidationMessage5('') }, 5000);
        }
    }

    const handleGetTotalPrice = () => {
        let total = 0;
        if (customerProduct.length > 0) {

            for (let i = 0; i < customerProduct.length; i++) {
                total += customerProduct[i].price * customerProduct[i].amount;
            }

            return total;
        }

    }

    const handleGetTotalAmount = () => {
        let total = 0;
        if (customerProduct.length > 0) {

            for (let i = 0; i < customerProduct.length; i++) {
                total += Number(customerProduct[i].amount);
            }

            return total;
        }

    }



    return (
        <div>
            {userConnected === true ?

                <div className="col-7 container">
                    {paymentMethods.length == 0 ? null :
                        <div className="container">

                            <div>
                                <h3 className="text-center">
                                    Facturación
                                </h3>
                            </div>
                            <div className="container py-3 mt-4 justify-content-center">
                                <div className=" mb-3">
                                    <div>
                                        <input className='form-control' style={{ width: "100%" }} type="text" onChange={e => setQuery(e.target.value)} placeholder='Busque y agregue el o los productos' />
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
                                                        <div className='p-2 border-bottom product-item-list d-flex' key={index}>
                                                            <p>
                                                                <span className="fw-bold"> {product.id + ' - '} </span>
                                                                <span className="fw-bold"></span> {product.name + ': '}
                                                                <span className="fw-bold"></span> {product.description}
                                                            </p>
                                                            <button type='button' className="btn btn-success me-2 ms-auto" onClick={() => handleAddProduct(product.id, product.price, product.name)} ><i className="fas fa-plus"></i></button>
                                                        </div>
                                                    );
                                                })
                                        }
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Productos añadidos
                                    </p>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col"> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customerProduct.length == 0 ?
                                                    <tr>
                                                        <td colSpan="5">
                                                            <div className=" text-center alert alert-danger col" role="alert">
                                                                No hay productos añadidos
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    :
                                                    customerProduct.map(function (product, index) {
                                                        return (
                                                            <tr key={index}>
                                                                <th>
                                                                    <input type="text" className="form-control" value={product.name} disabled />
                                                                </th>
                                                                <th>
                                                                    <input type="number" className="form-control" onChange={e => handleAddProductAmount(e.target.value, product.id)} />
                                                                </th>
                                                                <th>
                                                                    <input type="text" className="form-control" value={product.price + ' CRC'} disabled />
                                                                </th>
                                                                <th>
                                                                    <button type='button' className="btn btn-danger " onClick={() => handleMinusProduct(product.id)} ><i className="fas fa-minus"></i></button>
                                                                </th>
                                                            </tr>
                                                        );
                                                    })
                                            }
                                            <tr>
                                                <th>
                                                    Total
                                                </th>
                                                <th>
                                                    {handleGetTotalAmount()}
                                                </th>
                                                <th>
                                                    {handleGetTotalPrice()} CRC
                                                </th>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Nombre de cliente
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerName} onChange={e => setCustomerName(e.target.value)}></input>

                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Apellidos
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerLastName} onChange={e => setCustomerLastName(e.target.value)}></input>

                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Cédula
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerIdentification} onKeyUp={e => justNumberID(e.target.value)} onChange={e => setCustomerIdentification(e.target.value)} maxLength="10"></input>
                                    <div className='text-danger mt-3' role='alert'>
                                        {validationMessage4 === '' ? null : validationMessage4}
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Número de tarjeta de credito
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerCreditCard} onKeyUp={e => justNumberCreditCard(e.target.value)} onChange={e => setCustomerCreditCard(e.target.value)}></input>
                                    <div className='text-danger mt-3' role='alert'>
                                        {validationMessage5 === '' ? null : validationMessage5}
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Método de pago
                                    </p>
                                    <select className="form-select" aria-label="Default select example" ref={refPaymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                                        {paymentMethods.map((paymentMethod) => {
                                            return (
                                                <option key={paymentMethod.id} value={paymentMethod.id}>
                                                    {paymentMethod.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Número de teléfono
                                    </p>
                                    <input type="tel" className="col-12 form-control" ref={refCustomerPhone} onKeyUp={e => justNumberTel(e.target.value)} onChange={e => setCustomerPhone(e.target.value)} maxLength="11"></input>
                                    <div className='text-danger mt-3' role='alert'>
                                        {validationMessage2 === '' ? null : validationMessage2}
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        País
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerCountry} onChange={e => setCustomerCountry(e.target.value)}></input>

                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Dirección
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerAddress} onChange={e => setCustomerAddress(e.target.value)}></input>

                                </div>
                                <div className=" mb-3">
                                    <p className="text-black">
                                        Código Postal
                                    </p>
                                    <input type="text" className="col-12 form-control" ref={refCustomerPostalCode} onKeyUp={e => justNumberPostal(e.target.value)} onChange={e => setCustomerPostalCode(e.target.value)} maxLength="6"></input>
                                    <div className='text-danger mt-3' role='alert'>
                                        {validationMessage3 === '' ? null : validationMessage3}
                                    </div>
                                </div>
                                <p className="text-black">
                                    Estado de factura
                                </p>
                                <div className=" mb-3">
                                    <select className="form-select" aria-label="Default select example" onChange={e => setStatus(e.target.value)} >
                                        <option value="0">Por pagar</option>
                                        <option value="1">Pagado</option>
                                    </select>
                                </div>
                                <div className="d-flex">
                                    <div className=" mb-3 col-2 me-3">
                                        <button type="button" className="btn btn-success col-12" onClick={() => handleBilling({
                                            customerName, customerLastName, customerIdentification, customerCreditCard,
                                            paymentMethod, customerPhone, "products": customerProduct, customerCountry, customerAddress, customerPostalCode, Status
                                        })}>
                                            Guardar
                                        </button>
                                    </div>
                                    {status == "loading" ? <Spinner /> : null}
                                    <div className='text-danger mt-3' role='alert'>
                                        {validationMessage === '' ? null : validationMessage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <Navigate to="/" />
            }
        </div>

    )
}