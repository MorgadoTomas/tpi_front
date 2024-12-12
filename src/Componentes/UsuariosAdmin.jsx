import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UsuariosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      filtro: '',
      filtroPor: 'nombre',
      isAdmin: false, // Para verificar si el usuario es admin
    };
  }

  componentDidMount() {
    this.checkAdminStatus(); // Verifica si el usuario es admin
    this.cargarUsuarios();   // Carga los usuarios solo si es admin
  }

  checkAdminStatus = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado.");
      window.location.href = '/'; // Redirige a la página principal si no está autenticado
      return;
    }

    axios
      .post('http://localhost:4000/api/check-admin', {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        if (response.data.isAdmin) {
          this.setState({ isAdmin: true }); // Establece que el usuario es admin
        } else {
          alert("No eres un administrador. Acceso denegado.");
          window.location.href = '/'; // Redirige si no es administrador
        }
      })
      .catch(error => {
        console.error('Error al verificar el admin:', error);
        alert("Hubo un error al verificar los permisos.");
        window.location.href = '/'; // Redirige si hay error
      });
  }

  cargarUsuarios = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:4000/api/usuarios/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({ usuarios: response.data.usuarios });
      })
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
      });
  };

  handleFilterChange = (event) => {
    this.setState({ filtro: event.target.value });
  };

  handleFiltroPorChange = (event) => {
    this.setState({ filtroPor: event.target.value });
  };

  handleToggleAdmin = (userId, currentStatus) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert("No se ha encontrado el token. Por favor, inicia sesión nuevamente.");
      return;
    }
  
    // Cambia true/false por 1/0
    const newStatus = currentStatus ? 0 : 1;  // Si currentStatus es true (admin), se pone 0 (usuario normal), y viceversa.
  
    axios.put(`http://localhost:4000/api/usuarios/admin/${userId}`, 
      { admin: newStatus }, 
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        alert(`Usuario actualizado como ${newStatus === 1 ? 'admin' : 'usuario normal'}`);
        this.cargarUsuarios(); // Recarga la lista de usuarios
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Hubo un error al actualizar el rol.";
        console.error('Error al cambiar el rol de admin:', error.response || error);
        alert(errorMessage);
      });
  };  

  render() {
    const { usuarios, filtro, filtroPor, isAdmin } = this.state;

    if (!isAdmin) {
      return <div>No tienes permisos para acceder a esta página.</div>; // Mensaje si no es admin
    }

    const usuariosFiltrados = usuarios.filter((usuario) => {
      const campo = usuario[filtroPor]?.toLowerCase() || '';
      return campo.includes(filtro.toLowerCase());
    });

    return (
      <div className="d-flex min-vh-100 bg-light">
        <aside className="mr-4" style={{ width: '250px' }}>
          <nav className="d-flex flex-column">
            <Link to="/admin" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <LayoutDashboard className="mr-2" />
              Panel de control
            </Link>
            <Link to="/admin/productos" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <Package className="mr-2" />
              Productos
            </Link>
            <Button variant="light" className="text-left mb-2 d-flex align-items-center">
              <Users className="mr-2" />
              Usuarios
            </Button>
            <Link to="/admin/ventas" className="text-left mb-2 d-flex align-items-center btn btn-light">
              <ShoppingCart className="mr-2" />
              Ventas
            </Link>
          </nav>
        </aside>

        <main className="flex-grow-1 container">
          <div className="py-4">
            <h5>Administrar Usuarios</h5>
            <Form className="d-flex flex-column gap-3">
              <FormControl
                placeholder={`Filtrar por ${filtroPor}`}
                value={filtro}
                onChange={this.handleFilterChange}
                style={{ maxWidth: '300px' }}
              />
              <div>
                <Form.Check
                  inline
                  type="radio"
                  name="filtroPor"
                  value="nombre"
                  label="Nombre"
                  checked={filtroPor === 'nombre'}
                  onChange={this.handleFiltroPorChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="filtroPor"
                  value="apellido"
                  label="Apellido"
                  checked={filtroPor === 'apellido'}
                  onChange={this.handleFiltroPorChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="filtroPor"
                  value="mail"
                  label="Email"
                  checked={filtroPor === 'mail'}
                  onChange={this.handleFiltroPorChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="filtroPor"
                  value="usuario"
                  label="Usuario"
                  checked={filtroPor === 'usuario'}
                  onChange={this.handleFiltroPorChange}
                />
              </div>
            </Form>
          </div>

          <div className="py-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Usuario</th>
                  <th>Admin</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.mail}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.admin ? 'Sí' : 'No'}</td>
                    <td>
                      <Button 
                        variant={usuario.admin ? "danger" : "success"}
                        onClick={() => this.handleToggleAdmin(usuario.id, usuario.admin)}>
                        {usuario.admin ? 'Quitar Admin' : 'Hacer Admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    );
  }
}

export default UsuariosAdmin;