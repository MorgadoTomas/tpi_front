import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

class CerrarSesionButton extends Component {
  cerrarSesion = () => {
    // Elimina el token y el usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    // Redirige al inicio después de cerrar sesión
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
