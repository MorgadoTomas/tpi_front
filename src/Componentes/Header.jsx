import React, { Component } from 'react';
import { ShoppingCart, Search } from "lucide-react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import CerrarSesionButton from './CerrarSesionButton';  // Importar el componente de cerrar sesión

class Header extends Component {
  render() {
    const isLoggedIn = localStorage.getItem('token');  // Verificar si el usuario está logueado

    return (
      <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="h2 font-weight-bold text-decoration-none">
            (LOGO)
          </Link>

          <div className="flex-grow-1 mx-4 position-relative">
            <input type="search" placeholder="Buscar..." className="form-control" />
            <Search className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/carrito" className="text-muted">
              <ShoppingCart />
            </Link>

            {/* Mostrar el botón adecuado según si el usuario está logueado */}
            {isLoggedIn ? (
              <CerrarSesionButton />
            ) : (
              <Link to="/login">
                <Button variant="outline-primary">Iniciar sesión</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;