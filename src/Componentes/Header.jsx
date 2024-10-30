// componentes/Header.jsx
import React, { Component } from 'react';
import { ShoppingCart, Search } from "lucide-react";
import { Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="h2 font-weight-bold">(LOGO)</div>
          <div className="flex-grow-1 mx-4 position-relative">
            <input type="search" placeholder="Buscar..." className="form-control" />
            <Search className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
          </div>
          <div className="d-flex align-items-center gap-3">
            <ShoppingCart className="text-muted" />
            <Button variant="outline-secondary">Iniciar Sesión</Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
