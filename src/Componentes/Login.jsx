// Login.jsx
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <Form className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control type="text" placeholder="Nombre de usuario" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <br />
        <Button variant="dark" className="w-100">Iniciar sesión</Button>
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
