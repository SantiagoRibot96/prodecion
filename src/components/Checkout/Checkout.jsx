import { useState, useEffect } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import './Checkout.css'

const Checkout = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [comentarios, setComentarios] = useState("");

  const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

  const manejadorFormulario = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Los campos del email no coinciden");
      return;
    }

    const orden = {
      items: carrito.map(producto => ({
        id: producto.item.id,
        nombre: producto.item.nombre,
        cantidad: producto.cantidad
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
      comentarios
    };

    Promise.all(
      orden.items.map( async (productoOrden) => {
        const productoRef = doc(db, "Productos", productoOrden.id);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc( productoRef, {
          stock: stockActual - productoOrden.cantidad
        })
      })
    )
      .then(() => {
        addDoc(collection(db, "Ordenes"), orden)
          .then(docRef => {
            setOrderId(docRef.id);
            vaciarCarrito();
            setError("");
            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setEmailConfirmacion("");
            setComentarios("");
          })
          .catch(error => {
            setError("Error al crear la orden ", error);
          });
      })
      .catch(error => {
        setError("No se pudo actualizar el stock ", error);
      });
  }

  return (
    <>
      <h2>Checkout</h2>

      <form onSubmit={manejadorFormulario} className="container formulario">

        <div>
          {
            carrito.map(producto => (
              <div key={producto.item.id}>
                <p> {producto.item.nombre} X {producto.cantidad}</p>
                <p> Total: ${producto.item.precio*producto.cantidad}.- </p>
                <hr />
              </div>
            ))
          }

          {
            cantidadTotal != 0 && <p> Total a pagar: ${cantidadTotal}.- </p>
          }

        </div>

        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido</span>
            <input type="text" className="form-control" onChange={(e) => setApellido(e.target.value)} value={apellido}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Telefono</span>
            <input type="text" className="form-control" onChange={(e) => setTelefono(e.target.value)} value={telefono}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email</span>
            <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Confirma tu Email</span>
            <input type="text" className="form-control" onChange={(e) => setEmailConfirmacion(e.target.value)} value={emailConfirmacion}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Comentarios</span>
            <textarea className="form-control" onChange={(e) => setComentarios(e.target.value)} value={comentarios}></textarea>
          </div>

          {
            error && <p className="error"> {error} </p>
          }

          {
            orderId ? <div className="checkout"> <p>Gracias por tu compra! Tu numero de orden es:</p> <strong>{orderId}</strong> <Link className='btn btn-secondary' to="/"> Volver </Link></div> : <button type="submit" className='btn btn-success'>Finalizar Compra</button>
          }
        </div>
        
      </form>
    </>
  )
}

export default Checkout