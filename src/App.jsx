import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Auth from './components/Auth/Auth';
import NewUser from './components/NewUser/NewUser';
import NewPredict from './components/NewPredict/NewPredict';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <Navbar />

          <Routes>
            <Route path='/' element={ <ItemListContainer/> } />
            <Route path='/iniciarsesion' element={ <Auth /> } />
            <Route path='/crearusuario' element={ <NewUser /> } />
            <Route path='/crearPredict' element={ <NewPredict /> } />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </>
  )
}

export default App