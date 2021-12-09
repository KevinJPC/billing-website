import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser, selectUserStatus, selectUserError, loginAsync, reLoginAsync
} from '../user/userSlice';
import { Navigate } from 'react-router-dom';

export function Login() {

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);
    const dispatch = useDispatch();

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    useEffect(function () {    

        console.log("re logeando")

        if(sessionStorage.getItem('jwt')){
            dispatch(reLoginAsync());
        }

    }, []);

    const handleLogin = () => {
        console.log("iniciando sesion")
        console.log(identifier)
        console.log(password)
        dispatch(loginAsync({ identifier, password }))
    }

    return (
        <div>
            {user.id ? <Navigate to="/ConsultarProducto" /> :
                <div className='container d-flex justify-content-center'>
                    <div className='col-5'>
                        <h2 className='text-center pb-4'>
                            Iniciar sesión
                        </h2>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input type="text" className="form-control" onChange={e => setIdentifier(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>

                        {
                            userError === '' ? null :
                        <div>
                            <p className='text-danger'>
                                {userError}
                            </p>
                        </div>
                        }

                        <button type='button' className="btn btn-success" onClick={() => handleLogin()}>Iniciar sesión</button>
                    </div>

                </div>
            }
        </div>

    );
}
