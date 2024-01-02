import { useState } from "react";
import './Contador.css';

const Contador = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);

    const sumarContador = () => {
        if(contador < stock) {
            setContador(contador + 1);
        }
    }

    const restarContador = () => {
        if(contador > inicial) {
            setContador(contador - 1);
        }
    }


  return (
    <>
        <div className="btn">
            <div>
                <button onClick={restarContador} className="btn btn-outline-primary"> - </button>
                <strong> {contador} </strong>
                <button onClick={sumarContador} className="btn btn-outline-primary"> + </button>
            </div>
            <button onClick={() => funcionAgregar(contador)} className="btn btn-primary"> Agregar al carrito</button>
        </div>
    </>
  )
}

export default Contador