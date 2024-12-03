import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';  // o el archivo correspondiente con los estilos globales
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
import PrivateRoute from './Componentes/PrivateRoute';  // Importa el componente PrivateRoute

class App extends Component {
  render() {
    return (
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header />
          <NavBar />
          
          <main className="flex-grow-1 container my-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/registro" element={<MainForm />} />
              <Route path="/login" element={<Login />} />

              {/* Rutas protegidas */}
              <Route
                path="/carrito"
                element={<PrivateRoute><CarritoProductos /></PrivateRoute>}
              />
              <Route
                path="/producto/:id"
                element={<PrivateRoute><ProductoDetallado /></PrivateRoute>}
              />
              <Route
                path="/admin"
                element={<PrivateRoute><Admin /></PrivateRoute>}
              />
              <Route
                path="/admin/productos"
                element={<PrivateRoute><ProductosAdmin /></PrivateRoute>}
              />
              <Route
                path="/admin/usuarios"
                element={<PrivateRoute><UsuariosAdmin /></PrivateRoute>}
              />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;