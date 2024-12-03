import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

class CerrarSesionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
    };
  }

  handleCerrarSesion = () => {
    // Eliminar el token y el usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // Cambiar el estado para redirigir
    this.setState({ redirectToLogin: true });
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />; // Redirige al login
    }

    return (
      <Button variant="outline-danger" onClick={this.handleCerrarSesion}>
        Cerrar sesión
      </Button>
    );
  }
}

export default CerrarSesionButton;