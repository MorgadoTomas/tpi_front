import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Componentes/Header';
import NavBar from './Componentes/NavBar';
import MainForm from './Componentes/MainForm';
import Login from './Componentes/Login';
import CarritoProductos from './Componentes/CarritoProductos';
import Inicio from './Componentes/Inicio';
import Productos from './Componentes/Productos';
import ProductoDetallado from './Componentes/ProductoDetallado';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header />
          <NavBar /> {/* Incluye el NavBar aquí */}
          
          <main className="flex-grow-1 container my-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} /> {/* Ruta para Productos */}
              <Route path="/registro" element={<MainForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrito" element={<CarritoProductos />} />
              <Route path="/producto/:id" element={<ProductoDetallado />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
