import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      isLoggedIn: false,  // Estado para verificar si el usuario está logueado
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
    const url = "http://localhost:4000/api/usuarios/registrar"; // Cambia la URL si es necesario

    try {
        const resp = await axios.post(url, datos);
        if (resp.data.status === 'ok') {
            alert("Usuario registrado correctamente");
            this.setState({ success: 'Usuario creado con éxito. Ahora puedes iniciar sesión.' });

            // Suponiendo que la API devuelve un token o algo similar después de registrar
            // Guardar el token en el localStorage (o en el estado si es necesario)
            localStorage.setItem('token', resp.data.token); // Ajusta esto según la respuesta de la API
            localStorage.setItem('usuario', resp.data.usuario); // Si es necesario, almacena también el nombre de usuario

            // Actualiza el estado para redirigir al usuario al inicio
            this.setState({ isLoggedIn: true });
        }
    } catch (error) {
        if (error.response) {
            const mensajeError = error.response.data.message || "Ocurrió un error al crear el usuario.";
            if (error.response.status === 409 || mensajeError.includes("Usuario ya registrado")) {
                alert("El usuario ya está registrado.");
                this.setState({ error: "El usuario ya existe. Intenta con otro nombre de usuario." });
            } else {
                console.log("Error de registro:", mensajeError);
                this.setState({ error: mensajeError });
            }
        } else {
            this.setState({ error: 'Ocurrió un error al crear el usuario.' });
        }
    }
};

  render() {
    const { success, error, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/inicio" />; // Redirige a inicio.jsx
    }

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
        {success && <p className="text-success text-center mt-2">{success}</p>}
        {error && <p className="text-danger text-center mt-2">{error}</p>}
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Inicia sesión</Link>
        </p>
      </Form>
    );
  }
}

export default MainForm;