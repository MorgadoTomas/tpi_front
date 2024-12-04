import React, { Component } from 'react';
import { Button, FormControl, Table, Form } from 'react-bootstrap';
import { Trash2, LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa axios

class UsuariosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      filtro: ''
    };
  }

  componentDidMount() {
    // Cargar usuarios al montar el componente
    this.cargarUsuarios();
  }

  cargarUsuarios = () => {
    // Realiza la petición para obtener los usuarios
    axios.get('http://localhost:5000/api/usuarios', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Suponiendo que tienes un token en el almacenamiento local
      }
    })
    .then(response => {
      this.setState({ usuarios: response.data.usuarios });
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });
  };


  handleFilterChange = (event) => {
    this.setState({ filtro: event.target.value });
  };

  render() {
    const { usuarios, filtro } = this.state;
    const usuariosFiltrados = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

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
            <Form className="d-flex gap-3">
              <FormControl
                placeholder="Filtrar por nombre"
                value={filtro}
                onChange={this.handleFilterChange}
                style={{ maxWidth: '200px' }}
              />
            </Form>
          </div>

          <div className="py-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          className="p-1"
                          onClick={() => this.eliminarUsuario(usuario.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
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