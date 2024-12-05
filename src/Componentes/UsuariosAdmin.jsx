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
      filtroPor: 'nombre', // Campo por el cual se realizará el filtro
    };
  }

  componentDidMount() {
    this.cargarUsuarios();
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

  render() {
    const { usuarios, filtro, filtroPor } = this.state;

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
