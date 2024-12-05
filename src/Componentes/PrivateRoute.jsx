import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { children } = this.props; // Usamos children en lugar de element

    // Verifica si el usuario está autenticado (por ejemplo, si hay un token en el localStorage)
    const isAuthenticated = localStorage.getItem('token'); 

    if (!isAuthenticated) {
      // Si no está autenticado, redirige a la página de login
      return <Navigate to="/login" />;
    }

    // Si está autenticado, renderiza los componentes protegidos
    return children;
  }
}

export default PrivateRoute;