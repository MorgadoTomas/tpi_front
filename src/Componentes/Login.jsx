import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      password: '',
      error: '',
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    // Verifica si el usuario ya está logueado
    if (localStorage.getItem('token')) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  iniciarSesion = async (event) => {
    event.preventDefault();
    const { usuario, password } = this.state;
    const datos = { usuario, password };
    const url = "http://localhost:4000/api/usuarios/login";

    try {
      const response = await axios.post(url, datos);
      if (response.data.token) {
        // Si el login es exitoso, guarda el token y el usuario en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', response.data.usuario);
        // Actualiza el estado para redirigir
        this.setState({ isLoggedIn: true }); // Esto es cuando el login es exitoso
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
  };

  render() {
    const { usuario, password, error, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/" />; // Redirige a la raíz
    }

    return (
      <div>
        <Form onSubmit={this.iniciarSesion} className="max-w-md mx-auto space-y-4">
          <br />
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              name="usuario"
              value={usuario}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Button variant="dark" type="submit" className="w-100">Iniciar sesión</Button>
          {error && <p className="text-danger text-center mt-2">{error}</p>}
          <p className="text-center mt-4">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-primary">Regístrate aquí</Link>
          </p>

          {/* Botón para acceder al panel de Admin */}
          <div className="text-center mt-3">
            <Link to="/admin">
              <Button variant="secondary">ADMIN</Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;