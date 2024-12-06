import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CerrarSesionButton extends Component {
  cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('carrito');
    window.location.href = '/';
  };

  render() {
    return (
      <Button variant="outline-danger" onClick={this.cerrarSesion}>
        Cerrar sesión
      </Button>
    );
  }
}

export default CerrarSesionButton;