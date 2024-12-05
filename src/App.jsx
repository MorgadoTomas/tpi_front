import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Componentes/Header';
import NavBar from './Componentes/NavBar';
import MainForm from './Componentes/MainForm';
import Login from './Componentes/Login';
import CarritoProductos from './Componentes/CarritoProductos';
import Inicio from './Componentes/Inicio';
import Productos from './Componentes/Productos';
import ProductoDetallado from './Componentes/ProductoDetallado';
import Admin from './Componentes/Admin';
import ProductosAdmin from './Componentes/ProductosAdmin';
import UsuariosAdmin from './Componentes/UsuariosAdmin';
import VentasAdmin from "./Componentes/VentasAdmin";
import PrivateRoute from './Componentes/PrivateRoute';
import FormularioCompra from './Componentes/FormularioCompra';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  // Función para actualizar el término de búsqueda
  handleSearch = (term) => {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header onSearch={this.handleSearch} />
          <NavBar />
          
          <main className="flex-grow-1 container my-4">
            <Routes>
              <Route path="/" element={<Inicio searchTerm={this.state.searchTerm} />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/registro" element={<MainForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrito" element={<CarritoProductos />} />
              <Route path="/producto/:id" element={<ProductoDetallado />} />
              
              {/* Rutas protegidas de administración */}
              <Route path="/admin" element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              } />
              <Route path="/admin/productos" element={
                <PrivateRoute>
                  <ProductosAdmin />
                </PrivateRoute>
              } />
              <Route path="/admin/usuarios" element={
                <PrivateRoute>
                  <UsuariosAdmin />
                </PrivateRoute>
              } />
              <Route path="/admin/ventas" element={
                <PrivateRoute>
                  <VentasAdmin />
                </PrivateRoute>
              } />
              <Route path="/formulario-compra" element={<FormularioCompra />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;