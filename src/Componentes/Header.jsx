import React, { Component } from 'react';
import { ShoppingCart, Search } from "lucide-react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

class Header extends Component {
  render() {
    return (
      <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Hacer clic en el logo lleva a Inicio */}
          <Link to="/" className="h2 font-weight-bold text-decoration-none">
            (LOGO)
          </Link>

          <div className="flex-grow-1 mx-4 position-relative">
            <input type="search" placeholder="Buscar..." className="form-control" />
            <Search className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Redirige al carrito de productos */}
            <Link to="/carrito" className="text-muted">
              <ShoppingCart />
            </Link>

            {/* Redirige al formulario de iniciar sesión */}
            <Link to="/login">
              <Button variant="outline-secondary">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
