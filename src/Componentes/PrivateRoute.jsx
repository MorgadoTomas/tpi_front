import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { children } = this.props;

    // Lógica de autenticación (reemplaza con tu lógica real)
    const isAuthenticated = true; // Aquí debes reemplazar esto con tu lógica de autenticación real

    if (!isAuthenticated) {
      // Si no está autenticado, redirige a la página de login
      return <Navigate to="/login" />;
    }

    // Si está autenticado, renderiza los componentes protegidos
    return children;
  }
}

export default PrivateRoute;