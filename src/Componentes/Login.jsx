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

  iniciarSesion = (event) => {
    event.preventDefault();
    const { usuario, password } = this.state;
    const datos = { usuario, password };
    const url = "http://localhost:4000/api/usuarios/login";
  
    // Realizamos la solicitud POST usando axios
    axios.post(url, datos)
      .then((response) => {
        if (response.data.token) {
          // Si el login es exitoso, guarda el token, el usuario y la verificación de admin en el localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('usuario', response.data.usuario);
          localStorage.setItem('isAdmin', response.data.adminVerificacion); // Guardar si es admin          
          
          // Actualiza el estado para redirigir
          this.setState({
            isLoggedIn: true,
            isAdmin: response.data.adminVerificacion  // Guarda el estado del admin
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
      });
  };  

  render() {
    const { usuario, password, error, isLoggedIn, isAdmin } = this.state;
  
    if (isLoggedIn) {
      if (isAdmin) {
        return <Navigate to="/admin" />;  // Redirige a Admin si es admin
      } else {
        return <Navigate to="/" />;  // Redirige a la página de inicio si no es admin
      }
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
        </Form>
      </div>
    );
  }  
}

export default Login;