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


export function Billing() {

    const refCustomerName = useRef();
    const refCustomerLastName = useRef();
    const refPaymentMethod = useRef();

    const user = useSelector(selectUser);
    const paymentMethods = useSelector(selectPaymentMethod);
    const paymentMethodStatus = useSelector(selectPaymentMethodStatus);
    const bills = useSelector(selectBill);
    const status = useSelector(selectBillStatus);
    const products = useSelector(selectProduct);
    const productStatus = useSelector(selectProductStatus);
    const userConnected = useSelector(selectUserConnected);
    const billRegistered = useSelector(selectBillRegistered);

    const dispatch = useDispatch();

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

    useEffect(function () {

        if (query === '') {
            handleGetProducts();
        } else {
            handleGetProductsByQuery(query);
        }
        dispatch(getPaymentMethodAsync());

        if (userConnected === null && sessionStorage.getItem('jwt')) {
            console.log("re logeando")
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
        customerProductArray.push({ id, price, name });
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
        dispatch(registerBillAsync(
            bill
        ))
        console.log("factura ", bill);

    }

    const cleanInputs = () => {
        refCustomerName.current.value = "";
        refCustomerLastName.current.value = "";
        refPaymentMethod.current.value = paymentMethods[0].id;
    }

    return (
        <div>
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
                                </tbody>
                            </table>
                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                Nombre de cliente
                            </p>
                            <input type="text" className="col-12 " ref={refCustomerName} onChange={e => setCustomerName(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                Apellidos
                            </p>
                            <input type="text" className="col-12 " ref={refCustomerLastName} onChange={e => setCustomerLastName(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                ID
                            </p>
                            <input type="text" className="col-12 " onChange={e => setCustomerIdentification(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                Número de tarjeta de credito
                            </p>
                            <input type="text" className="col-12 " onChange={e => setCustomerCreditCard(e.target.value)}></input>

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
                            <input type="text" className="col-12 " onChange={e => setCustomerPhone(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                País
                            </p>
                            <input type="text" className="col-12 " onChange={e => setCustomerCountry(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                Dirección
                            </p>
                            <input type="text" className="col-12 " onChange={e => setCustomerAddress(e.target.value)}></input>

                        </div>
                        <div className=" mb-3">
                            <p className="text-black">
                                Código Postal
                            </p>
                            <input type="text" className="col-12 " onChange={e => setCustomerPostalCode(e.target.value)}></input>

                        </div>
                        <p className="text-black">
                            Estado de factura
                        </p>
                        <div className=" mb-3">
                            <select className="form-select" aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                                <option value="0">Por pagar</option>
                                <option value="1">Pagado</option>
                            </select>
                        </div>
                        <div className=" mb-3">
                            <button type="button" className="btn btn-success col-12" onClick={() => handleBilling({
                                customerName, customerLastName, customerIdentification, customerCreditCard,
                                paymentMethod, customerPhone, "products": customerProduct, customerCountry, customerAddress, customerPostalCode, Status
                            })}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>

    )

}