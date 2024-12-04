import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { children } = this.props; // Usamos children en lugar de element

    // Aquí va tu lógica para verificar si el usuario está autenticado

    if (!isAuthenticated) {
      // Si no está autenticado, redirige a la página de login
      return <Navigate to="/login" />;
    }

    // Si está autenticado, renderiza los componentes protegidos
    return children;
  }
}

export default PrivateRoute;