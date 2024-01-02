import 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from "../../services/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

const NewUser = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ error, setError ] = useState('');

    const submit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: nombre
                })
                    .then(() => {
                    console.log(auth.currentUser.displayName);
                })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((err) => {
                setError('no se pudo crear el usuario');
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
                    :    <form onSubmit={submit}>
                            <label htmlFor="email">Correo Electronico</label>
                            <input type="email" id="email" required onChange={ (e) => setEmail(e.target.value) }/>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" required onChange={ (e) => setPassword(e.target.value)}/>
                            <label>Nickname</label>
                            <input type="text" required onChange={(e) => setNombre(e.target.value)} />
                            <p className='alert alert-danger'>{error}</p>
                            <button type='submit'>Crear cuenta</button>
                        </form>
        }
    </>
  )
}

export default NewUser