import { useState, createContext } from "react";

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
});

export const CarritoProvider = ({children}) => {

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find(producto => producto.item.id === item.id);

        if(!productoExistente) {
            setCarrito(prev => [...prev, {item, cantidad}]);
            setTotal(prev => prev + cantidad);
            setCantidadTotal(prev => prev + (cantidad * item.precio));
        } else {
            const carritoActualizado = carrito.map(prod => {
                if(prod.item.id === item.id) {
                    return{...prod, cantidad: prod.cantidad + cantidad};
                } else {
                    return prod;
                }
            })
            setCarrito(carritoActualizado);
            setTotal(prev => prev + cantidad);
            setCantidadTotal(prev => prev + (cantidad * item.precio));
        }
    }

    const eliminarProducto = (id) => {
        const productoEliminado = carrito.find(prod => prod.item.id === id);
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);

        setCarrito(carritoActualizado);
        setTotal(prev => prev - productoEliminado.cantidad);
        setCantidadTotal(prev => prev - (productoEliminado.cantidad * productoEliminado.item.precio));
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        setTotal(0);
        setCantidadTotal(0);
    }

    return (
        <CarritoContext.Provider value = {{carrito, total, cantidadTotal, agregarAlCarrito, eliminarProducto, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}

export default CarritoProvider