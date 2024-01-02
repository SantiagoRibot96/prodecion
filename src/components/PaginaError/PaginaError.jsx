import React from 'react'
import './PaginaError.css'
import { Link } from 'react-router-dom'

const PaginaError = () => {
  return (
    <div className='container-fluid flex'>
        <img src='../../public/error404.jpg' className='grande'></img>

        <div>
            <h2>Error 404: Parrilla no encontrada :(</h2>
            <Link className="btn btn-primary" to={'/'}>Volver</Link>
        </div>
    </div>
  )
}

export default PaginaError