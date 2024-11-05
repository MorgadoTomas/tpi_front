// App.jsx
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Componentes/Header';
import NavBar from './Componentes/NavBar';
import MainForm from './Componentes/MainForm';
import Footer from './Componentes/Footer';
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio';
import Productos from './Componentes/Productos';
import ProductosDetallados from './Componentes/ProductoDetallado';
import CarritoProductos from './Componentes/CarritoProductos';
import Admin from './Componentes/Admin';


class App extends Component {
  render() {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header /> <br />
        <NavBar /> <br />
        <main className="flex-grow-1 container my-4">
          <MainForm/>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
