import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

class PrivateRoute extends React.Component {
  state = {
    isAdmin: null,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("Token no encontrado.");
      this.setState({ error: "Token no válido o no encontrado" });
      return;
    }

    axios.post('http://localhost:4000/api/check-admin', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.isAdmin) {
          this.setState({ isAdmin: true });
        } else {
          this.setState({ error: "No autorizado" });
          console.error("El usuario no es administrador.");
          // Mostrar alert y redirigir
          alert("No eres administrador. Redirigiendo...");
        }
      })
      .catch(error => {
        console.error('Error al verificar el admin:', error.response?.data || error.message);
        this.setState({ error: 'Error al verificar el administrador' });
      });
  }

  render() {
    const { isAdmin, error } = this.state;
    const { children } = this.props;

    if (error) {
      return <Navigate to="/login" />;
    }

    if (isAdmin === null) {
      return <div>Loading...</div>;
    }

    return isAdmin ? children : <Navigate to="/not-authorized" />;
  }
}

export default PrivateRoute;