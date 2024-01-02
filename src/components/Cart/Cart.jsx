import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const { carrito, total, cantidadTotal, vaciarCarrito} = useContext(CarritoContext);

    if ( cantidadTotal === 0) {
        return (
            <>
                <h2>No hay productos en el carrito!</h2>
                <Link to="/">Ver productos</Link>
            </>
        )
    }

  return (
    <div>
        {
            carrito.map(producto => <CartItem key={producto.item.id} {...producto} /> )
        }
        <h3>Total: ${cantidadTotal} </h3>
        <h3>Productos: {total} </h3>
        <button onClick={() => vaciarCarrito()} className="btn btn-danger">Vaciar Carrito</button>
        <Link to="/checkout" className="btn btn-primary">Finalizar Compra</Link>
    </div>
  )
}

export default Cart