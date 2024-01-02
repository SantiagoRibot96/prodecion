import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../services/config';

const Navbar = () => {
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

    const userSingOut = () => {
        signOut(auth)
            .then(() => {
                console.log('signed out');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="nav-link navbar-brand fuenteGrande" to="/">Prodecion</Link>
                    <div className="centrado" id="navbarNav">
                        {authUser   ?
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <NavLink className="nav-link navbar-brand" to="" onClick={userSingOut}>Salir</NavLink>
                                            </li>
                                        </ul>  
                                    :
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <NavLink className="nav-link navbar-brand" to="iniciarsesion">Iniciar Sesion</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link navbar-brand" to="crearusuario">Crear Cuenta</NavLink>
                                            </li>
                                        </ul>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar