// Login.jsx
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  iniciarSesion = async (event) => {
    event.preventDefault();
    const { usuario, password } = this.state;
    const datos = {
        usuario: usuario,
        password,
    };
    const url = "http://localhost:4000/api/usuarios/login"; // Cambia la URL si es necesario

    try {
        const response = await axios.post(url, datos);
        console.log(response.data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            this.props.history.push('/dashboard');
        }
    } catch (error) {
        console.log(error);
        this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
};

  render() {
    return (
      <Form onSubmit={this.iniciarSesion} className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            name="usuario"
            value={this.state.usuario}
            onChange={this.handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <br />
        <Button variant="dark" type="submit" className="w-100">Iniciar sesión</Button>
        {this.state.error && <p className="text-danger text-center mt-2">{this.state.error}</p>}
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
    );
  }
}

export default Login;
