import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    try {
      const response = await axios.post('http://localhost:5000/login', {
        usuario: username,
        password
      });
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/dashboard');
    } catch (error) {
      this.setState({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            name="username"
            value={this.state.username}
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
          ¿No tienes cuenta? <Link to="/registro" className="text-primary">Regístrate aquí</Link>
        </p>
      </Form>
    );
  }
}

export default Login;
