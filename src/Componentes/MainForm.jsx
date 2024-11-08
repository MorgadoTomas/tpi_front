import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      usuario: '',
      password: '',
      email: '',
      error: '',
      success: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre, usuario, password, email } = this.state;
    try {
      const response = await axios.post('http://localhost:5000/registrar', {
        nombre,
        apellido: '', // Agrega el apellido si es necesario
        password,
        mail: email,
        usuario
      });
      if (response.data.status === 'ok') {
        this.setState({ success: 'Usuario creado con éxito. Ahora puedes iniciar sesión.' });
      }
    } catch (error) {
      this.setState({ error: 'Ocurrió un error al crear el usuario.' });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleChange}
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <br />
        <Button variant="dark" type="submit" className="w-100">Crear Usuario</Button>
        {this.state.success && <p className="text-success text-center mt-2">{this.state.success}</p>}
        {this.state.error && <p className="text-danger text-center mt-2">{this.state.error}</p>}
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Inicia sesión</Link>
        </p>
      </Form>
    );
  }
}

export default MainForm;
