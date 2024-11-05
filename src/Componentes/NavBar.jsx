// componentes/NavBar.jsx
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <nav className="bg-dark text-white">
        <div className="container d-flex justify-content-center py-2">
          <Button variant="link" className="text-white">INICIO</Button>
          <Button variant="link" className="text-white">PRODUCTOS</Button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
