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
import Admin from './Componentes/Admin';
import FormularioCompra from './Componentes/FormularioCompra'; // Importa el componente
import ProductosAdmin from './Componentes/ProductosAdmin'; // Importar ProductosAdmin
import UsuariosAdmin from './Componentes/UsuariosAdmin'; // Importar UsuariosAdmin


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
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
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/productos" element={<ProductosAdmin />} />
              {/* Ruta para el formulario de compra */}
              <Route path="/formulario-compra" element={<FormularioCompra />} />
              <Route path="/admin/productos" element={<ProductosAdmin />} /> {/* Ruta para ProductosAdmin */}
              <Route path="/admin/usuarios" element={<UsuariosAdmin />} /> {/* Ruta para UsuariosAdmin */}
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
