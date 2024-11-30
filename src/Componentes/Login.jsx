import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; // Usamos useNavigate en lugar de useHistory
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtiene el hook navigate

  // Verifica si el usuario ya está logueado
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // Si ya hay un token, redirige automáticamente al inicio
      navigate('/inicio');
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'usuario') {
      setUsuario(value);
    } else {
      setPassword(value);
    }
  };

  const iniciarSesion = async (event) => {
    event.preventDefault();
    const datos = { usuario, password };
    const url = "http://localhost:8080/api/usuarios/login"; 

    try {
      const response = await axios.post(url, datos);
      if (response.data.token) {
        // Si el login es exitoso, guarda el token y el usuario en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', response.data.usuario);
        // Redirige al usuario a la página de inicio
        navigate('/inicio');
      }
    } catch (error) {
      console.log(error);
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      {localStorage.getItem('token') ? (
        // Si el token está presente, redirige automáticamente
        <p>Ya estás logueado, redirigiendo...</p>
      ) : (
        <Form onSubmit={iniciarSesion} className="max-w-md mx-auto space-y-4">
          <br />
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              name="usuario"
              value={usuario}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Button variant="dark" type="submit" className="w-100">Iniciar sesión</Button>
          {error && <p className="text-danger text-center mt-2">{error}</p>}
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
      )}
    </div>
  );
};

export default Login;