import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser, selectUserStatus, selectUserError, loginAsync, reLoginAsync
} from '../user/userSlice';
import { Navigate } from 'react-router-dom';
import { Spinner } from './Spinner';


export function Login() {
    //selector
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);

    //dispatch
    const dispatch = useDispatch();

    //states
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const [validationMessage, setValidationMessage] = useState('')

    useEffect(function () {
        //will re-login if you has jwt and it is valid
        if (sessionStorage.getItem('jwt')) {
            dispatch(reLoginAsync());
        }

    }, []);

    //function handler to validate fields and call loginAsync
    const handleLogin = () => {
        if (identifier === '' || password === '') {
            setValidationMessage('Debe completar todos los campos');
            setTimeout(() => { setValidationMessage('') }, 5000);
            return
        }
        dispatch(loginAsync({ identifier, password }))
    }

    return (
        <div>
            {user.id ? <Navigate to="/consultar-factura" /> :
                <div className='container d-flex justify-content-center'>
                    <div className='col-5'>
                        <h2 className='text-center pb-4'>
                            Iniciar sesión
                        </h2>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input type="text" className="form-control" onChange={e => setIdentifier(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>

                        {
                            userError === '' ? null :
                                <div>
                                    <p className='text-danger mt-3'>
                                        {userError}
                                    </p>
                                </div>
                        }

                        {<div>
                            <p className='text-danger mt-3'>
                                {validationMessage}
                            </p>
                        </div>}

                        <div className='d-flex align-items-center mt-3'>
                            <button type='button' className="btn btn-success" onClick={() => handleLogin()}>Iniciar sesión</button>

                            {
                                userStatus === 'loading' ? <div className='ms-3'><Spinner /></div> : null
                            }

                        </div>
                    </div>

                </div>
            }
        </div>

    );
}
