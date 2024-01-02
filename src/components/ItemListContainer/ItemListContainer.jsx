import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./ItemListContainer.css";
import { auth } from "../../services/config";
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from "react-router-dom";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

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
            .catch((error) => console.log(error));
    }, []);

    const titulo = "Predicts!";

    return (
        <>
            {authUser   ?
                            <>
                                <h2 className="h2-destacados">{titulo}</h2>
                                <Link className="btn btn-primary" to="crearPredict">Crea tu prediccion</Link>
                                <ItemList productos={productos} />
                            </>
                        :
                            <h2>Inicie sesion para continuar</h2>
            }
        </>
    )
}

export default ItemListContainer;