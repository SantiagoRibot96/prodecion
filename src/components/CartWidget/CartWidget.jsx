import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
import './CartWidget.css';

const CartWidget = () => {
  const {total} = useContext(CarritoContext);

  return (
    <div>
      <Link to = "/cart" className='btn'>
        <img className="carritoDeCompras" src="../../3144456.png" alt="Carrito" />
        {
          total > 0 && <strong> {total} </strong>
        }
      </Link>
    </div>
  )
}

export default CartWidget