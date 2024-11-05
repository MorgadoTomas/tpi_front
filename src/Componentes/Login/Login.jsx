// componentes/Login.jsx
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Eye, EyeOff } from "lucide-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { showPassword } = this.state;

    return (
      <Form className="max-w-md mx-auto space-y-4">
        <Form.Group>
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" placeholder="Nombre de usuario" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <br />
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="pr-5"
            />
            <button
              type="button"
              className="position-absolute"
              style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
              onClick={this.togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="text-muted" /> : <Eye className="text-muted" />}
            </button>
          </div>
        </Form.Group>
        <br />
        <div className="text-right">
          <a href="#" className="text-primary">¿Olvidaste tu contraseña?</a>
        </div>
        <br />
        <Button variant="dark" className="w-100">INICIAR SESIÓN</Button>
      </Form>
    );
  }
}

export default Login;
