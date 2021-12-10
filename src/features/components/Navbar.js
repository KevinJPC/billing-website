import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser, selectUserStatus, logOut, selectUserConnected
} from '../user/userSlice';

import {
    removeProducts
} from '../product/productSlice';

export function Navbar() {

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userConnected = useSelector(selectUserConnected);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(removeProducts())
        dispatch(logOut())
    }

    return (
        <div className='mb-5'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Distribuciones nacionales</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px;' }}>
                            {userConnected !== true ?
                                <li className="nav-item">
                                    <Link to='/' className="nav-link active">Iniciar sesión</Link>
                                </li>
                                :
                                <Fragment>
                                    
                                    <li className="nav-item">
                                        <Link to='/ConsultarFactura' className="nav-link active">Estado factura</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/GestorFactura' className="nav-link active">Facturación</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/ConsultarProducto' className="nav-link active">Consultar producto</Link>
                                    </li>
                                </Fragment>
                            }
                        </ul>

                        {userConnected === true ?
                            <div className="d-flex me-5">
                                <a className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i className="fas fa-user me-2"></i>{user.username}</a>
                                <ul className="dropdown-menu dropdown-menu-end me-5">
                                    <li><a className="dropdown-item" href="#">Ver perfil</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to='/' className="nav-link" onClick={() => handleLogOut()}>Cerrar sesión</Link></li>
                                </ul>
                            </div>
                            : null}
                    </div>
                </div>
            </nav>
        </div>
    )

}