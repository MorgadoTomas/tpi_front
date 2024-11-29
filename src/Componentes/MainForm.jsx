import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      success: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registroDeUsuario = async (event) => {
    event.preventDefault();
    const { nombre, apellido, usuario, password, email } = this.state;
    const datos = {
        nombre,
        apellido,
        usuario,
        password,
        mail: email,
    };
    const url = "http://localhost:8080/api/usuarios/registrar"; // Cambia la URL si es necesario

    try {
        const resp = await axios.post(url, datos);
        console.log(resp.data);
        if (resp.data.status === 'ok') {
            alert("Usuario registrado correctamente");
            this.setState({ success: 'Usuario creado con éxito. Ahora puedes iniciar sesión.' });
        }
    } catch (error) {
        // Revisar si el error tiene datos de respuesta
        if (error.response) {
            // Mostrar el mensaje exacto del servidor si está disponible
            const mensajeError = error.response.data.message || "Ocurrió un error al crear el usuario.";
            
            if (error.response.status === 409 || mensajeError.includes("Usuario ya registrado")) {
                alert("El usuario ya está registrado.");
                this.setState({ error: "El usuario ya existe. Intenta con otro nombre de usuario." });
            } else {
                console.log("Error de registro:", mensajeError);
                this.setState({ error: mensajeError });
            }
        } else {
            // Error genérico si no hay una respuesta detallada
            this.setState({ error: 'Ocurrió un error al crear el usuario.' });
        }
    }
};

  render() {
    return (
      <Form onSubmit={this.registroDeUsuario} className="max-w-md mx-auto space-y-4">
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
            placeholder="Apellido"
            name="apellido"
            value={this.state.apellido}
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
