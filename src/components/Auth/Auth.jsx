import 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from "../../services/config";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Auth = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const submit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setError('no se pudo iniciar sesion');
            });
    }

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
    }, []);

    return (
        <>
            {authUser
                        ?   <Link className='btn btn-secondary' to="/">Continuar</Link>
                        :   <form onSubmit={submit}>
                                <label htmlFor="email">Correo Electronico</label>
                                <input type="email" id="email" requiered onChange={ (e) => setEmail(e.target.value) }/>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" requiered onChange={ (e) => setPassword(e.target.value)}/>
                                <button type='submit'>Iniciar Sesion</button>
                                <p className='alert alert-danger'>{error}</p>
                            </form>
            }
        </>
    )
}

export default Auth