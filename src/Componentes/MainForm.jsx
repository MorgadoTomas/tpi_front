import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

class MainForm extends Component {
  render() {
    return (
      <Form className="max-w-md mx-auto space-y-4">
        <br />
        <Form.Group>
          <Form.Control type="text" placeholder="Nombre" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="text" placeholder="Nombre de usuario" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <br />
        <Button variant="dark" className="w-100">Crear Usuario</Button>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? 
          <Link to="/login" className="text-primary">Inicia sesión</Link> {/* Redirige al Login */}
        </p>
      </Form>
    );
  }
}

export default MainForm;
