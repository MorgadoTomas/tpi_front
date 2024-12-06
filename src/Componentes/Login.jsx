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
    
    axios.post(url, datos)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('usuario', response.data.usuario);
          localStorage.setItem('isAdmin', response.data.adminVerificacion);        
          this.setState({
            isLoggedIn: true,
            isAdmin: response.data.adminVerificacion
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
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
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