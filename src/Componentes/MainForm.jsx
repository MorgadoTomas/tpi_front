import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      usuario: '',
      password: '',
      email: '',
      error: '',
      success: '',
      isLoggedIn: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registroDeUsuario = (event) => {
    event.preventDefault();
    const { nombre, apellido, usuario, password, email } = this.state;
    const datos = {
      nombre,
      apellido,
      usuario,
      password,
      mail: email,
    };
    const url = "http://localhost:4000/api/usuarios/registrar";

    axios.post(url, datos)
      .then((resp) => {
        if (resp.data.status === 'ok') {
          this.setState({
            success: 'Usuario creado con éxito. Ahora puedes iniciar sesión.',
            error: '',
            isLoggedIn: true,
          });

          localStorage.setItem('userId', resp.data.userId);
          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('usuario', usuario);
          window.dispatchEvent(new Event('storage'));
        }
      })
      .catch((error) => {
        let mensajeError = 'Ocurrió un error al crear el usuario.';
        if (error.response) {
          mensajeError = error.response.data.message || mensajeError;
        }
        this.setState({
          error: mensajeError,
          success: '',
        });
      });
  };

  render() {
    const { nombre, apellido, usuario, password, email, error, success, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <Form onSubmit={this.registroDeUsuario} className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={nombre}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={apellido}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            name="usuario"
            value={usuario}
            onChange={this.handleChange}
            required
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
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <br />
        <Button variant="dark" type="submit" className="w-100">Crear Usuario</Button>
        <br />
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Inicia sesión</Link>
        </p>
      </Form>
    );
  }
}

export default MainForm;