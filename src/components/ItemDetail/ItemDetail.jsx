import { Link } from 'react-router-dom';
import { useState } from 'react';
import Contador from '../Contador/Contador';
import { CarritoContext } from '../../context/CarritoContext';
import { useContext} from 'react';
import './ItemDetail.css';

const ItemDetail = ({id, nombre, precio, img, desc, stock}) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const {agregarAlCarrito} = useContext(CarritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);

    const item = {id, nombre, precio};
    agregarAlCarrito(item, cantidad);
  }

  return (
    <div className='contenedorItem'>
        <h2>{nombre} </h2>
        <h3>Precio: ${precio}.- </h3>
        <img src={img} alt={nombre} />
        <p>{desc}</p>
        <p>Stock: {stock}</p>
        <div className='container agregarCarrito'>
          <Link className='btn btn-secondary' to="/"> Volver </Link>
          {
            agregarCantidad > 0 ? (<Link to = "/cart" className='btn btn-success'>Terminar Compra</Link>) : (<Contador inicial = {1} stock = {stock} funcionAgregar = {manejadorCantidad}/>)
          }
        </div>
    </div>
  )
}

export default ItemDetail