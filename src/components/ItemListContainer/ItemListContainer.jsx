import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { db } from "../../services/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import "./ItemListContainer.css";
import { auth } from "../../services/config";
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from "react-router-dom";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

    const [authUser, setAuthUser] = useState(null);

    const [error, setError] = useState('');

    const [flag, setFlag] = useState(1);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
    }, []);

    useEffect(() => {
        const misProductos = collection(db, "usuarios");

        getDocs(misProductos)
            .then((res) => {
                const nuevosProductos = res.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProductos(nuevosProductos);
            })
            .catch((err) => console.log(err));
    }, []);

    const titulo = "Predicts!";

    if(authUser){
        const miDoc = getDoc(doc(db, "usuarios", auth.currentUser.displayName))
                        .then((res) => {
                            if(!res.data()){
                                setFlag(0);
                            }else{
                                setFlag(1);
                            }
                        });
    }


    return (
        <>
            {authUser   ?
                            <>
                                <h2 className="h2-destacados">{titulo}</h2>
                                <Link className="btn btn-primary" to="crearPredict">Crea tu prediccion</Link>
                                {flag   ?
                                            <ItemList productos={productos} />
                                        :
                                            <></>
                                }
                            </>
                        :
                            <h2>Inicie sesion para continuar</h2>
            }
        </>
    )
}

export default ItemListContainer;